import { utils } from "ethers";
import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import {
  type Address,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { JurisFundPoolAbi } from "@/abi/JurisFundPool.abi";
import { JusdcAbi } from "@/abi/JUSD.abi";

const tokenAddress = "0xD857A3CD0AF9Ab5e1c3298A44A81A18754161DAc";
const jurisfund = "0x2FDbD499ff0ACE66a9884572c88d7bb899118336";

const DepositJUSDCForm = () => {
  const { address, isConnected } = useAccount();
  const [amountToDeposit, setAmountToDeposit] = useState<string>("0");
  const [dataHash, setDataHash] = useState<Address>("0x0");
  const debouncedAmountToDeposit = useDebounce(amountToDeposit, 500);
  const [userJusdBalance, setUserJusdBalance] = useState<string>("0");
  const [requiresApproval, setRequiresApproval] = useState<boolean>(true);

  const { refetch: refetchUserJusdBalance } = useBalance({
    address: address!,
    token: tokenAddress,
    onSuccess(data) {
      setUserJusdBalance(data.formatted);
    },
    enabled: isConnected && address !== undefined,
  });

  const { data: allowance, refetch: refetchAllowance } = useContractRead({
    address: tokenAddress,
    abi: JusdcAbi,
    functionName: "allowance",
    args: [address!, jurisfund],
    enabled: isConnected && address !== undefined,
  });

  const { write: approveWriteFn, isLoading: approveIsLoading } = useContractWrite({
    address: tokenAddress,
    abi: JusdcAbi,
    functionName: "approve",
    args: [jurisfund, utils.parseUnits(userJusdBalance, 6).toBigInt()],
    async onSuccess(data) {
      setDataHash(data.hash);
      await reAwaitTx();
      await updateRequiresApproval(true);
    },
  });

  const { write: depositWriteFn, isLoading: depositIsLoading } = useContractWrite({
    address: jurisfund,
    abi: JurisFundPoolAbi,
    functionName: "stake",
    args: [true, utils.parseUnits(debouncedAmountToDeposit || "0", 6).toBigInt()],
    async onSuccess(data) {
      setDataHash(data.hash);
      await reAwaitTx();
      const balance = await refetchUserJusdBalance();
      if (balance.data) setUserJusdBalance(balance.data.formatted);
    },
  });

  const {
    isLoading,
    isSuccess: txIsSuccess,
    refetch: reAwaitTx,
  } = useWaitForTransaction({
    hash: dataHash,
    enabled: false,
  });

  useEffect(() => {
    void updateRequiresApproval(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAmountToDeposit]);

  const updateRequiresApproval = async (forceRefetch: boolean) => {
    const _allowance = forceRefetch ? (await refetchAllowance({})).data : allowance;
    console.log(_allowance);
    if ((_allowance ?? 0n) < utils.parseUnits(debouncedAmountToDeposit || "0", 6).toBigInt()) {
      setRequiresApproval(true);
    } else {
      setRequiresApproval(false);
    }
  };

  const processDeposit = () => {
    if (!isConnected || address == undefined) {
      return;
    }

    if (requiresApproval) {
      approveWriteFn();
      return;
    }

    depositWriteFn();
  };

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
        <span className="text-md text-gray-400 ">Balance: {userJusdBalance}</span>
        <button
          type="button"
          onClick={() => {
            setAmountToDeposit(userJusdBalance);
          }}
          className="my-3 inline-block h-8 w-12 rounded-xl bg-green-700 text-center text-sm text-white transition-all duration-150 hover:bg-gray-700"
        >
          MAX
        </button>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <button
          type="button"
          onClick={processDeposit}
          disabled={
            parseInt(debouncedAmountToDeposit) < 10 || debouncedAmountToDeposit === "" || isLoading
          }
          className="my-3 inline-block rounded-xl bg-blue-800 px-5 py-3 text-xl text-white transition-all duration-150 hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          {isLoading || depositIsLoading || approveIsLoading ? (
            <div className="flex items-center justify-center ">Loading ...</div>
          ) : (
            `
           ${requiresApproval ? "Approve" : "Confirm Deposit"}
           `
          )}
        </button>
        {/* Show deposit time 12 months here */}
        <div className="flex w-full justify-end">
          <span className="text-md text-gray-400 ">Deposit time: 12 months</span>
        </div>
        {dataHash !== "0x0" && txIsSuccess ? (
          <p>
            Successfull!
            <span>
              <a
                className="ml-2 text-blue-600 underline"
                href={`https://testnet.snowtrace.io/tx/${dataHash}`}
              >
                view on Snowtrace
              </a>
            </span>
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default DepositJUSDCForm;
