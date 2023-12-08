import { ObjectId } from "mongodb";
import Web3 from "web3";

import { contractAbi } from "../../cron/Contract.abi";
import { getDB } from "../../cron/db";

// MongoDB and Ethereum configuration
const contractABI = contractAbi;
const privateKey = process.env["PRIVATE_KEY"] ?? ""; // Should be securely managed
const tokenAddress = "0x720e1514657ef85C3db3f4419c6987db3B4F2C56";
const contractAddress = "0x720e1514657ef85C3db3f4419c6987db3B4F2C56";
// Set up Web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env["RPC_PROVIDER_URL"] ?? ""));
const db = await getDB();
const collection = db.collection("BorrowersTable");

async function fetchBorrowers(): Promise<Borrower[]> {
  try {
    const borrowers = await collection
      .find({ applicationStatus: "Approved", loanInssuanseDate: null })
      .toArray();
    return borrowers as unknown as Borrower[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to sign and send transaction
async function signAndSendTransaction(plaintiff: string, amount: string): Promise<string> {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  // Check if contract.methods.dispense exists before invoking encodeABI
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (contract.methods.dispense) {
    const data = contract.methods.dispense(tokenAddress, plaintiff, BigInt(amount)).encodeABI();

    const transaction = {
      to: contractAddress,
      data: data,
      gas: await web3.eth.estimateGas({ to: contractAddress, data: data }),
      gasPrice: await web3.eth.getGasPrice(),
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    return receipt.transactionHash as unknown as string;
  } else {
    throw new Error("dispense method is not defined on the contract");
  }
}

// Function to update the borrower in MongoDB
async function updateBorrower(id: string, transactionHash: string): Promise<void> {
  try {
    const now = new Date();
    const objectId = new ObjectId(id);
    await collection.updateOne(
      { _id: objectId },
      { $set: { payoffDate: now, transactionHash: transactionHash } },
    );
  } catch (error) {
    console.error("Error updating borrower:", error);
    throw error;
  }
}

// Main processBorrowers function
export async function processBorrowers(): Promise<void> {
  try {
    const borrowers = await fetchBorrowers();

    for (const borrower of borrowers) {
      try {
        const transactionHash = await signAndSendTransaction(
          borrower.walletAddress,
          borrower.loanAmount ?? "",
        );
        await updateBorrower(borrower.id, transactionHash);
      } catch (error) {
        console.error(`Error processing borrower ${borrower.id}:`, error);
        // Decide whether to continue or stop
      }
    }
  } catch (error) {
    console.error("Error fetching borrowers:", error);
    throw error;
  }
}

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
  fixedAPY?: string;
  loanInssuanseDate?: Date;
  accruedInterest?: string;
  payoffDate?: Date;
}
