import Head from "next/head";
import NextLink from "next/link";
import React from "react";
// import { useMediaQuery } from "usehooks-ts";

export default function Home() {
  // const matches = useMediaQuery("(max-width: 480px)");

  return (
    <>
      <Head>
        <title>JurisFund | Home</title>
        <meta
          name="description"
          content="JurisFund is a tokenized private credit protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns."
        />
      </Head>

      <section className="w-full">
        <div className="max-w-screen-xs mx-auto px-4 sm:px-6 md:max-w-6xl">
          {/* Hero content */}
          <div className="pb-14 pt-10 md:pb-20 md:pt-40">
            {/* Section header */}
            <div className="pb-12 text-center md:pb-16">
              <h1
                className="leading-tighter mb-16 text-5xl font-extrabold tracking-tighter md:text-6xl"
                data-aos="zoom-y-out"
              >
                Juris
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Fund
                </span>
              </h1>
              <div className="mx-auto max-w-3xl">
                <p
                  className="mb-8 text-xl text-gray-600"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  JurisFund is a private credit protocol backed by consumer pre-settlement funding.
                  This protocol offers investors an opportunity to get exposure to a unique asset
                  class, notable for its lack of correlation with broader market trends and its
                  history of high returns.
                </p>
                <div
                  // className="content-between justify-between align-middle xl:mx-auto xl:max-w-xs"
                  className="flex flex-col gap-14 pt-4 md:flex-row md:justify-start md:gap-0 md:pt-10"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div
                    className="w-full md:w-1/2"
                    // className="relative"
                  >
                    <NextLink
                      className="btn mb-4 w-full rounded-lg bg-blue-600 p-4 text-white hover:bg-blue-400"
                      href="/borrower"
                    >
                      Start as a borrower
                    </NextLink>
                  </div>
                  <div className="w-full md:w-1/2">
                    <NextLink
                      className="btn w-full rounded-lg bg-gray-900 p-4 text-white hover:bg-gray-400 "
                      href="#0"
                    >
                      Enter investor portal
                    </NextLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
