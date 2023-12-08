import { type ReactNode, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { AppContext } from "./AppContext";

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [connectedAddress, setConnectedAddress] = useState<string>("");

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  useEffect(() => {
    if (!isDisconnected && !isConnecting && address !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setConnectedAddress(address);
    }
  }, [isDisconnected, isConnecting, address]);

  return (
    <AppContext.Provider
      value={{
        connectedAddress,
        isConnected,
        isDisconnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
