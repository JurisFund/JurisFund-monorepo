import NextImage from "next/image";
import type { FunctionComponent } from "react";
import { Footer } from "ui";

const links = [
  { children: "Apply for funding", href: "/borrower", variant: "text" },
  { children: "How It Works", href: "/howitworks", variant: "text" },
  { children: "Cases We Fund", href: "/cases", variant: "text" },
  { children: "About", href: "/about", variant: "text" },
  { children: "Testimonials", href: "/testimonials", variant: "text" },
] as const;

const PageFooter: FunctionComponent = () => {
  return (
    <Footer
      links={links}
      customLogo={
        <NextImage
          src="/jf-letters-original.png"
          alt="Jurisfund"
          width={60}
          height={60}
          className="mx-auto h-10 w-auto border-2 border-yellow-950"
        />
      }
    />
  );
};

export { PageFooter as Footer };
