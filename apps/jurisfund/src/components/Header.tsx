import { ConnectWallet } from "@thirdweb-dev/react";
import type { FunctionComponent } from "react";
import { Container } from "ui";
import { Navigation } from "ui/components/Navigation";

const links = {
  leftLinks: [
    { children: "Features", href: "#features", variant: "text" },
    { children: "Testimonials", href: "#testimonials", variant: "text" },
    { children: "Pricing", href: "#pricing", variant: "text" },
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
    <header className=" py-10 ">
      <Container className="flex justify-evenly">
        <Navigation {...links} />
        <ConnectWallet
          theme={"light"}
          auth={{ loginOptional: false }}
          switchToActiveChain={true}
          modalSize={"compact"}
          welcomeScreen={{}}
        />
      </Container>
    </header>
  );
};

export { PageHeader as Header };
