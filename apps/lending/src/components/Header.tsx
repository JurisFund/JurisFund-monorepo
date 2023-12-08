import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextImage from "next/image";
import type { FunctionComponent } from "react";
import { Container } from "ui";
import { Navigation } from "ui/components/Navigation";

const links = {
  leftLinks: [
    { children: "Borrowers App", href: "https://jurisfund.vercel.app", variant: "text" },
    // { children: "Admin Dashboard", href: "/applications", variant: "text" },
    // { children: "Pricing", href: "#pricing", variant: "text" },
  ],
  rightLinks: [],
} as const;

const PageHeader: FunctionComponent = () => {
  return (
    <header className=" py-10 ">
      <Container className="flex justify-evenly">
        <Navigation
          {...links}
          customLogo={
            <NextImage
              src="/jf-letters-original.png"
              alt="Jurisfund"
              width={60}
              height={60}
              className="border-2 border-yellow-950"
            />
          }
        />
        <ConnectButton
          chainStatus={{
            smallScreen: "full",
            largeScreen: "full",
          }}
          showBalance={false}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
      </Container>
    </header>
  );
};

export { PageHeader as Header };
