import { type ReactNode, useEffect, useState } from "react";
import { type Address, useAccount, useContractRead } from "wagmi";

import { ERC1155AdminAbi } from "@/ERC1155.abi";

import { AppContext } from "./AppContext";

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [connectedAddress, setConnectedAddress] = useState<string>("");
  const [connectedAddresOwnsAdminNFT, setConnectedAddressOwnsAdminNFT] = useState<boolean>(false);

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const {
    data: balanceOfData,
    // isError: balanceOfIsError,
    // isLoading: balanceOfIsLoading,
  } = useContractRead({
    address: "0xF22ff6630C4411DaE1026d278fD996064b103186",
    abi: ERC1155AdminAbi,
    functionName: "balanceOf",
    // @ts-expect-error TODO: fix this value 0 as bigint parameter type error
    args: [connectedAddress as Address, 0],
    enabled: !isConnecting && !isDisconnected && connectedAddress !== "",
  });

  useEffect(() => {
    if (!isDisconnected && !isConnecting && address !== undefined) {
      setConnectedAddress(address);
    }
  }, [isDisconnected, isConnecting, address]);

  useEffect(() => {
    if (balanceOfData !== undefined) {
      const parsedBalanceOfData = parseInt(balanceOfData.toString(), 10);
      setConnectedAddressOwnsAdminNFT(parsedBalanceOfData > 0);
    }
  }, [balanceOfData]);

  return (
    <AppContext.Provider
      value={{
        connectedAddress,
        connectedAddresOwnsAdminNFT,
        isConnected,
        isDisconnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
