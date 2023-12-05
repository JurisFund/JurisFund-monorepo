import type { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "JurisFund | %s",
  defaultTitle: "JurisFund",
  description:
    "JurisFund is a private credit protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns.",
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
