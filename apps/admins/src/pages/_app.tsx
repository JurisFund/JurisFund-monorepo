import "@/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";
import Head from "next/head";

// import type { Session } from "next-auth";
import { Layout } from "@/components/Layout";
import Providers from "@/components/Providers";
import { AppContextProvider } from "@/contexts/AppContextProvider";
import { api } from "@/utils/api";

function MyApp(
  { Component, pageProps /* : { session, ...pageProps }, */ }: AppProps /*<{ session: Session }> */,
) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Providers /* session={session} */>
        <AppContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContextProvider>
      </Providers>
    </>
  );
}

export default api.withTRPC(MyApp);
