import "@/styles.css";

// import { Sepolia } from "@thirdweb-dev/chains";
// import { embeddedWallet, smartWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import Head from "next/head";
// import type { Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { Layout } from "@/components/Layout";
// import { env } from "@/env.mjs";
import { api } from "@/utils/api";

export const factoryAddress = "0x76b7322f20a13aec6afc416222f2ce8ea23f6727";

// const smartWalletOptions = {
//   factoryAddress,
//   gasless: true,
// };

function MyApp(
  {
    Component,
    pageProps, // pageProps: { session, ...pageProps },
  }: AppProps /* <{ session: Session }> */,
) {
  return (
    <ThemeProvider attribute="class">
      {/* <ThirdwebProvider
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
      // > */}
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </ThirdwebProvider> */}
    </ThemeProvider>
  );
}

export default api.withTRPC(MyApp);
