import "@/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

import { Layout } from "@/components/Layout";
import Providers from "@/components/Providers";
import { api } from "@/utils/api";

function MyApp(
  {
    Component,
    pageProps, // pageProps: { session, ...pageProps },
  }: AppProps /* <{ session: Session }> */,
) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </ThemeProvider>
  );
}

export default api.withTRPC(MyApp);
