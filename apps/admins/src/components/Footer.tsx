import NextImage from "next/image";
import type { FunctionComponent } from "react";
import { Footer } from "ui";

const links = [
  // { children: "Features", href: "#features", variant: "text" },
  // { children: "Testimonials", href: "#testimonials", variant: "text" },
  // { children: "Pricing", href: "#pricing", variant: "text" },
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
