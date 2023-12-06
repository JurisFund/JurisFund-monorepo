import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { env } from "@/env.mjs";

const CURRENT_CHAIN = sepolia;
const projectId = env.NEXT_PUBLIC_WALLETCONNECTCLOUD_PROJECT_ID;

const { chains, publicClient } = configureChains([CURRENT_CHAIN], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "JurisFund",
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

interface Props {
  children: React.ReactNode;
  session: Session;
}

const Providers = (props: Props) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ThemeProvider attribute="class">
        <SessionProvider refetchInterval={0} session={props.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: "#6f51cf",
                accentColorForeground: "white",
                borderRadius: "small",
                fontStack: "system",
                overlayBlur: "small",
              })}
              chains={chains}
              initialChain={CURRENT_CHAIN}
            >
              {props.children}
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
};

export default Providers;
