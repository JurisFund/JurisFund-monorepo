import { Sepolia } from "@thirdweb-dev/chains";
import { /* metamaskWallet, */ ThirdwebProvider } from "@thirdweb-dev/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";

import { env } from "@/env.mjs";

interface Props {
  children: React.ReactNode;
  session: Session;
}

const Providers = (props: Props) => {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={props.session}>
        <ThirdwebProvider
          clientId={env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
          activeChain={Sepolia}
          // supportedWallets={[metamaskWallet()]}
          authConfig={{
            domain: env.NEXT_PUBLIC_NEXTAUTH_URL,
            authUrl: "/api/auth",
          }}
        >
          {props.children}
        </ThirdwebProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
