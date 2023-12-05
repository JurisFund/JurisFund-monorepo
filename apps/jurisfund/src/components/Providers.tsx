import { Sepolia } from "@thirdweb-dev/chains";
import { embeddedWallet, smartWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "next-themes";
import React from "react";

// import type { Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";
import { env } from "@/env.mjs";
export const factoryAddress = "0x76b7322f20a13aec6afc416222f2ce8ea23f6727";

const smartWalletOptions = {
  factoryAddress,
  gasless: true,
};
interface Props {
  children: React.ReactNode;
}

const Providers = (props: Props) => {
  return (
    <ThemeProvider attribute="class">
      {/* <SessionProvider session={session}> */}
      <ThirdwebProvider
        clientId={env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        activeChain={Sepolia}
        supportedWallets={[
          smartWallet(
            embeddedWallet({
              auth: {
                options: ["google", "apple", "email"],
              },
              recommended: true,
            }),
            smartWalletOptions,
          ),
        ]}
        // authConfig={{
        //   domain: env.NEXT_PUBLIC_NEXTAUTH_URL,
        //   authUrl: "/api/auth",
        // }}
      >
        {props.children}
      </ThirdwebProvider>
      {/* </SessionProvider> */}
    </ThemeProvider>
  );
};

export default Providers;
