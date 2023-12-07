import { createContext, useContext } from "react";

export interface AppContextProps {
  connectedAddress: string;
  connectedAddresOwnsAdminNFT: boolean;
  isConnected: boolean;
  isDisconnected: boolean;
}

export const AppContext = createContext<AppContextProps>({
  connectedAddress: "",
  connectedAddresOwnsAdminNFT: false,
  isConnected: false,
  isDisconnected: false,
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
