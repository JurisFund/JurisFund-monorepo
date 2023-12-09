import { Contract, providers, utils, Wallet } from "ethers";
import { ObjectId } from "mongodb";

import { env } from "@/env.mjs";

import { getDB } from "../../cron/db";
import { JurisEscrowAbi } from "../../cron/JurisEscrow.abi";
import { jurisfundAbi } from "../../cron/JurisFund.abi";

const SAFE_PRIVATE_KEY: string = env.SAFE_PRIVATE_KEY;
const RPC_URL_FUJI: string = env.RPC_URL_FUJI;
const SAFE_ADDRESS = "0x5Ddf646e7beC68243cFbB61bB6E90c826c6F5CAD";
const JUSDC_ADDRESS = "0xD857A3CD0AF9Ab5e1c3298A44A81A18754161DAc";
const JURIS_FUND_ADDRESS = "0x2FDbD499ff0ACE66a9884572c88d7bb899118336";

interface Borrower {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  stateLiveIn: string;
  typeOfCase: string;
  alreadyWorkingWithAttorney: string;
  lawFirmName: string;
  lawyerName: string;
  lawyerEmail?: string;
  lawyerWalletAddress?: string;
  expectedSettlementAmount: string;
  applicationFillingDate: Date;
  caseNumber: string;
  applicationStatus: string;
  loanAmount?: string;
  walletAddress: string;
  fixedAPR?: string;
  loanIssuanceDate?: Date;
  accruedInterest?: string;
  payoffDate?: Date;
  transactionHash?: string;
  escrowAddress?: string;
}

const provider = new providers.JsonRpcProvider(RPC_URL_FUJI);
const signer = new Wallet(SAFE_PRIVATE_KEY, provider);
const jurisFundContract = new Contract(JURIS_FUND_ADDRESS, jurisfundAbi, signer);

const db = await getDB();

const fetchBorrowers = async () => {
  const collection = db.collection("BorrowersTable");

  try {
    const borrowers = await collection
      .find({ applicationStatus: "Approved", loanIssuanceDate: null })
      .toArray();
    return borrowers as unknown as Borrower[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateBorrowerData = async (
  id: string,
  transactionHash: string,
  newEscrowAddress: string,
): Promise<void> => {
  const collection = db.collection("BorrowersTable");

  try {
    const now = new Date();
    const objectId = new ObjectId(id);
    await collection.updateOne(
      { _id: objectId },
      {
        $set: {
          loanIssuanceDate: now,
          transactionHash: transactionHash,
          escrowAddress: newEscrowAddress,
        },
      },
    );
  } catch (error) {
    console.error("Error updating borrower:", error);
    throw error;
  }
};

const processBorrowers = async () => {
  try {
    const borrowers = await fetchBorrowers();

    for (const borrower of borrowers) {
      if (borrower.loanAmount == null) return;
      borrower.loanAmount = utils.parseUnits(borrower.loanAmount, 6).toString();

      try {
        const transactionHash = await dispenseLoan(borrower.walletAddress, borrower.loanAmount);

        const { calldata, salt } = getEscrowInitializerAndSalt(borrower);

        const escrowAddress = await deployEscrow(calldata, salt);

        await updateBorrowerData(borrower.id, transactionHash, escrowAddress);
      } catch (error) {
        console.error(`Error processing borrower ${borrower.id}:`, error);
        // Decide whether to continue or stop
      }
    }
  } catch (error) {
    console.error("Error fetching borrowers:", error);
    throw error;
  }
};

const getEscrowInitializerAndSalt = (data: Borrower) => {
  const iface = new utils.Interface(JurisEscrowAbi);

  const calldata = iface.encodeFunctionData("initialize", [
    data.loanAmount,
    data.fixedAPR,
    data.walletAddress,
    data.lawyerWalletAddress,
    SAFE_ADDRESS,
    JUSDC_ADDRESS,
  ]);

  const salt = utils.keccak256(calldata);

  return { calldata, salt };
};

const deployEscrow = async (calldata: string, salt: string): Promise<string> => {
  const tx: providers.TransactionResponse = await jurisFundContract.deployEscrow(calldata, salt);
  const receipt: providers.TransactionReceipt = await tx.wait();

  const event = receipt.logs
    .filter((log) => log.logIndex === 1)
    .map((log) => jurisFundContract.interface.parseLog(log))
    .find((item) => item.name === "EscrowCreated");

  const proxyAddress: string = event?.args.proxy as string;

  return proxyAddress;
};

const dispenseLoan = async (plaintiffAddress: string, loanAmount: string): Promise<string> => {
  const tx: providers.TransactionResponse = await jurisFundContract.dispense(
    JUSDC_ADDRESS,
    plaintiffAddress,
    loanAmount,
  );
  const receipt: providers.TransactionReceipt = await tx.wait();
  return receipt.transactionHash;
};

export { processBorrowers };
