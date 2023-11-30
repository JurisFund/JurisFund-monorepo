import { ConnectWallet, useAddress, useWallet } from "@thirdweb-dev/react";
import { type FunctionComponent, useEffect, useMemo, useState } from "react";
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
  const [email, setEmail] = useState<string | undefined>();
  const connectedWallet = useWallet("embeddedWallet");

  const address = useAddress();

  useEffect(() => {
    if (connectedWallet) {
      connectedWallet
        .getEmail()
        .then((email) => {
          setEmail(email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [connectedWallet]);

  useMemo(() => {
    if (email !== undefined && address !== undefined) {
      // save email to global state
      console.log({ email, address });
    }
  }, [email, address]);

  console.log({ email, address });

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
