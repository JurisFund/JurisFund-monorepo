import { ConnectWallet, useAddress, useWallet } from "@thirdweb-dev/react";
import NextImage from "next/image";
import { type FunctionComponent, useEffect, useMemo, useState } from "react";
import { Container } from "ui";
import { Navigation } from "ui/components/Navigation";

const links = {
  leftLinks: [
    { children: "Apply for funding", href: "/borrower/application", variant: "text" },
    { children: "Investors", href: "#pricing", variant: "text" },
    { children: "Admins", href: "/applications", variant: "text" },
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
