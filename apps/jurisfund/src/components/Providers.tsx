import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";

import { env } from "@/env.mjs";
interface Props {
  children: React.ReactNode;
  session: Session | null;
}

const Providers = (props: Props) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={props.session}>
        <DynamicContextProvider
          settings={{
            environmentId: env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <DynamicWagmiConnector>{props.children}</DynamicWagmiConnector>
        </DynamicContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
