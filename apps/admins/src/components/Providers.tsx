import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ThemeProvider } from "next-themes";
import React from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { avalancheFuji, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { env } from "@/env.mjs";

const projectId = env.NEXT_PUBLIC_WALLETCONNECTCLOUD_PROJECT_ID;

const { chains, publicClient } = configureChains([avalancheFuji, sepolia], [publicProvider()]);

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
}

const Providers = (props: Props) => {
  return (
    <ThemeProvider attribute="class">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          theme={darkTheme({
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
          chains={chains}
          initialChain={avalancheFuji}
        >
          {props.children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

export default Providers;
