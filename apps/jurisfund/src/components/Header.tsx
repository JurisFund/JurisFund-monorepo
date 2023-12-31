// import { ConnectWallet, useAddress, useWallet } from "@thirdweb-dev/react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import NextImage from "next/image";
import type { FunctionComponent /*, useEffect, useMemo, useState */ } from "react";
import { Container } from "ui";
import { Navigation } from "ui/components/Navigation";

const links = {
  leftLinks: [
    { children: "Apply for funding", href: "/borrower", variant: "text" },
    { children: "How It Works", href: "/howitworks", variant: "text" },
    { children: "Cases We Fund", href: "/cases", variant: "text" },
    { children: "About", href: "/about", variant: "text" },
    { children: "Testimonials", href: "/testimonials", variant: "text" },
    {
      children: "Investors App",
      href: "https://jurisfund-lending.vercel.app",
      variant: "text",
    },
  ],
  rightLinks: [
    // {
    //   href: "/",
    //   variant: "",
    // },
  ],
} as const;

const PageHeader: FunctionComponent = () => {
  // const [email, setEmail] = useState<string | undefined>();
  // const connectedWallet = useWallet("embeddedWallet");

  // const address = useAddress();

  // useEffect(() => {
  //   if (connectedWallet) {
  //     connectedWallet
  //       .getEmail()
  //       .then((email) => {
  //         setEmail(email);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [connectedWallet]);

  // useMemo(() => {
  //   if (email !== undefined && address !== undefined) {
  //     // save email to global state
  //     // console.log({ email, address });
  //   }
  // }, [email, address]);

  return (
    <header className=" py-10 ">
      <Container className="flex justify-between md:justify-evenly">
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
        <DynamicWidget />
      </Container>
    </header>
  );
};

export { PageHeader as Header };
