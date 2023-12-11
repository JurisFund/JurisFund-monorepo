import type { Wallet } from "@dynamic-labs/sdk-react-core";
import { createContext, useContext } from "react";

export interface AppContextProps {
  connectedAddress: string;
  connectedEmbeddedWallet: Wallet["address"];
  connectedEmail: string;
}

export const AppContext = createContext<AppContextProps>({
  connectedAddress: "",
  connectedEmbeddedWallet: "",
  connectedEmail: "",
});

AppContext.displayName = "JurisFundAdminContext";

// export const useAppContext = () => useContext(AppContext);

export function useAppContext() {
  const context = useContext(AppContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (context === undefined) {
    throw new Error("useAppContext must be used within the AppContextProvider");
  }
  return context;
}
