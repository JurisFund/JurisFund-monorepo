import { Contract, providers, utils, Wallet } from "ethers";

import { env } from "@/env.mjs";
import { JurisEscrowAbi } from "@/pages/api/cron/JurisEscrow.abi";
import { jurisfundAbi } from "@/pages/api/cron/JurisFund.abi";

const SAFE_PRIVATE_KEY: string = env.SAFE_PRIVATE_KEY;
const RPC_URL_FUJI = "https://cabb-102-90-46-219.ngrok-free.app"; // env.RPC_URL_FUJI;
const SAFE_ADDRESS = "0x5Ddf646e7beC68243cFbB61bB6E90c826c6F5CAD";
const JUSDC_ADDRESS = "0xD857A3CD0AF9Ab5e1c3298A44A81A18754161DAc";
const JURIS_FUND_ADDRESS = "0x17938aeb69cdbbdb48c8346fdefba785cd6a68e5"; // "0x2FDbD499ff0ACE66a9884572c88d7bb899118336";

const provider = new providers.JsonRpcProvider(RPC_URL_FUJI);
const signer = new Wallet(SAFE_PRIVATE_KEY, provider);
const jurisFundContract = new Contract(JURIS_FUND_ADDRESS, jurisfundAbi, signer);

interface Borrower {
  id: string;
  lawyerWalletAddress: string | null;
  loanAmount: string | null;
  walletAddress: string;
  fixedAPY: string | null;
  transactionHash?: string | null;
  escrowAddress: string | null;
}

export const getEscrowInitializerAndSalt = (data: Borrower) => {
  const iface = new utils.Interface(JurisEscrowAbi);

  const calldata = iface.encodeFunctionData("initialize", [
    data.loanAmount,
    data.fixedAPY,
    data.walletAddress,
    data.lawyerWalletAddress,
    SAFE_ADDRESS,
    JUSDC_ADDRESS,
  ]);

  const salt = utils.keccak256(calldata);

  return { calldata, salt };
};

export const deployEscrow = async (calldata: string, salt: string): Promise<string> => {
  const tx: providers.TransactionResponse = await jurisFundContract.deployEscrow(calldata, salt);
  const receipt: providers.TransactionReceipt = await tx.wait();

  const event = receipt.logs
    .filter((log) => log.logIndex === 1)
    .map((log) => jurisFundContract.interface.parseLog(log))
    .find((item) => item.name === "EscrowCreated");

  const proxyAddress: string = event?.args.proxy as string;

  return proxyAddress;
};

export const dispenseLoan = async (
  plaintiffAddress: string,
  loanAmount: string,
): Promise<string> => {
  const tx: providers.TransactionResponse = await jurisFundContract.dispense(
    JUSDC_ADDRESS,
    plaintiffAddress,
    loanAmount,
  );
  const receipt: providers.TransactionReceipt = await tx.wait();
  return receipt.transactionHash;
};

export const handle = async (borrower: Borrower): Promise<Borrower | null> => {
  if (borrower.loanAmount == null) return null;
  borrower.loanAmount = utils.parseUnits(borrower.loanAmount, 6).toString();

  try {
    const transactionHash = await dispenseLoan(borrower.walletAddress, borrower.loanAmount);

    const { calldata, salt } = getEscrowInitializerAndSalt(borrower);

    const escrowAddress = await deployEscrow(calldata, salt);

    return { ...borrower, transactionHash, escrowAddress };
  } catch (error) {
    console.error(`Error processing borrower ${borrower.id}:`, error);
    return null;
  }
};
