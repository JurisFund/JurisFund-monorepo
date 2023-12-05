import type { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "JurisFund Admin | %s",
  defaultTitle: "JurisFund Admin",
  description: "JurisFund Admin is a small admin dashboard for custom admin role settings.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url:
      process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
        ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}`
        : "",
    site_name: `JurisFund`,
    images: [
      {
        url:
          process.env["NEXT_PUBLIC_VERCEL_URL"] !== undefined
            ? `https://${process.env["NEXT_PUBLIC_VERCEL_URL"]}/landing-page-screenshot.png`
            : "",
        alt: "JurisFund",
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
