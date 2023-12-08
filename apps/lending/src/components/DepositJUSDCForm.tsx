import React, { useEffect } from "react";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import {
  type Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { JuriFundEscrowAbi } from "@/JurisFundEscrow.abi";

const DepositJUSDCForm = () => {
  const [amountToDeposit, setAmountToDeposit] = useState<string>("0");
  const [dataHash, setDataHash] = useState<Address>("0x0");
  const debouncedAmountToDeposit = useDebounce(amountToDeposit, 500);

  const { config } = usePrepareContractWrite({
    address: "0xE8db6C75cd7482c7dD2536E84C2B5162c2Be2578",
    abi: JuriFundEscrowAbi,
    functionName: "deposit",
    // @ts-expect-error argument should be bigint and not int
    args: [parseInt(debouncedAmountToDeposit)],
    enabled: Boolean(debouncedAmountToDeposit),
  });

  const { data, write: depositWriteFn } = useContractWrite(config);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (data !== undefined && data.hash !== undefined) {
      setDataHash(data.hash); // check this - verify if it works - we are avoiding the undefined value for the data.hash
    }
  }, [data]);

  const { isLoading, isSuccess: depositIsSuccess } = useWaitForTransaction({
    hash: dataHash,
    enabled: Boolean(dataHash !== "0x0"),
  });

  return (
    <form className="mt-5">
      <input
        className="mb-3 block w-full appearance-none rounded-lg border bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
        type="number"
        step={0.01}
        min={0}
        placeholder="Amount..."
        value={amountToDeposit}
        onChange={(e) => {
          setAmountToDeposit(e.target.value);
        }}
      />
      {/* Show JUSDC balance here and show it with a MAX button */}
      <div className="flex w-full items-center justify-between px-4">
        <span className="text-md text-gray-400 ">Balance: 0</span>
        <button
          type="button"
          onClick={() => {
            setAmountToDeposit("100"); // TODO: get balance and set the value here
          }}
          className="my-3 inline-block h-8 w-12 rounded-xl bg-green-700 text-center text-sm text-white transition-all duration-150 hover:bg-gray-700"
        >
          MAX
        </button>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => {
            if (depositWriteFn !== undefined) depositWriteFn();
          }}
          disabled={
            debouncedAmountToDeposit === "0" || debouncedAmountToDeposit === "" || isLoading
          }
          className="my-3 inline-block rounded-xl bg-gray-800 px-5 py-3 text-xl text-white transition-all duration-150 hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          {isLoading ? (
            <div className="flex items-center justify-center ">Loading ...</div>
          ) : (
            "Confirm Deposit"
          )}
        </button>
        {/* Show deposit time 12 months here */}
        <div className="flex w-full justify-end">
          <span className="text-md text-gray-400 ">Deposit time: 12 months</span>
        </div>
        {data !== undefined && depositIsSuccess ? (
          <div>
            Successfully minted your NFT!
            <div>
              {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
              <a href={`https://sepolia.etherscan.io/tx/${data.hash}`}>Sepolia Etherscan</a>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default DepositJUSDCForm;
