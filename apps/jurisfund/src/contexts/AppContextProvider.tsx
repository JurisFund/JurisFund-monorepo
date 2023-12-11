import { useDynamicContext, useEmbeddedWallet, type Wallet } from "@dynamic-labs/sdk-react-core";
import { type ReactNode, useEffect, useState } from "react";
import { type Address, useAccount } from "wagmi";

import { AppContext } from "./AppContext";

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [connectedAddress, setConnectedAddress] = useState<Address>("0x0");
  const [connectedEmbeddedWallet, setConnectedEmbeddedWallet] = useState<Wallet["address"]>(""); // [1
  const [connectedEmail, setConnectedEmail] = useState<string>(""); // [1

  const { address, isConnected } = useAccount();

  const { createEmbeddedWallet, userHasEmbeddedWallet } = useEmbeddedWallet();
  const { user } = useDynamicContext();

  async function checkWalletAndCreate() {
    if (!userHasEmbeddedWallet()) {
      try {
        const walletId = await createEmbeddedWallet();
        // do whatever you want with that Id
        setConnectedEmbeddedWallet(walletId.address);
      } catch (e) {
        // handle error
        console.log({ errorCreatingWallet: e });
        alert("Error creating wallet");
      }
    } else {
      if (user?.email !== undefined) {
        setConnectedEmbeddedWallet(user.wallet!);
        setConnectedEmail(user.email );
      }
    }
  }

  useEffect(() => {
    if (isConnected && address !== undefined) {
      setConnectedAddress(address);

      void checkWalletAndCreate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);

  // console.log({ connectedAddress, connectedEmbeddedWallet });

  return (
    <AppContext.Provider
      value={{
        connectedAddress,
        connectedEmbeddedWallet,
        connectedEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
