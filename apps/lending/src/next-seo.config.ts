import type { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "JurisFund Lend | %s",
  defaultTitle: "JurisFund Lend",
  openGraph: {
    type: "website",
    locale: "en_US",
    url:
      process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
        ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}`
        : "",
    site_name: `JurisFund Lend`,
    images: [
      {
        url:
          process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
            ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/landing-page-screenshot.png`
            : "",
        alt: "JurisFund Lend",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@jurisfund",
    site: "www.x.com/jurisfund",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default config;
