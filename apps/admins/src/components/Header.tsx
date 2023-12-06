import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextImage from "next/image";
import type { FunctionComponent /*, useEffect, useMemo, useState */ } from "react";
import { Container } from "ui";
import { Navigation } from "ui/components/Navigation";

const links = {
  leftLinks: [
    // { children: "Apply for funding", href: "/borrower", variant: "text" },
    // { children: "Investors", href: "#pricing", variant: "text" },
    // { children: "Admins", href: "/applications", variant: "text" },
  ],
  rightLinks: [
    // {
    //   children: "Sign\u00a0in",
    //   className: "hidden xs:block",
    //   classNameMobile: "block xs:hidden",
    //   href: "/signin",
    //   variant: "text",
    // },
    // {
    //   href: "/",
    //   variant: "",
    // },
  ],
} as const;

const PageHeader: FunctionComponent = () => {
  return (
    <header className="py-10 ">
      <Container className="flex justify-between">
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
            largeScreen: "avatar",
          }}
        />
      </Container>
    </header>
  );
};

export { PageHeader as Header };
