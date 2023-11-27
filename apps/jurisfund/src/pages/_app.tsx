import "@/styles.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Layout } from "@/components/Layout";
import { api } from "@/utils/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default api.withTRPC(MyApp);
