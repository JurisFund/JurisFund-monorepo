import Head from "next/head";
import NextLink from "next/link";
import React from "react";

export default function BorrowerApplicationSuccessPage() {
  return (
    <>
      <Head>
        <title>JurisFund | Application Successfull</title>
        <meta
          name="description"
          content="Thank You ! Thank you for your application! It will be reviewed and we will let you know soon."
          // JurisFund is a tokenized private credit protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns."
        />
      </Head>
      <div className="flex h-full items-center justify-center">
        <div className="rounded bg-gradient-to-r from-purple-500 via-green-500 to-blue-500 p-1 shadow-lg">
          <div className="flex flex-col items-center space-y-2 bg-white p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-28 w-28 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
              Thank You !
            </h1>
            <p>
              Thank you for your application! It will be reviewed and we will let you know soon.
            </p>
            <NextLink
              href="/borrower"
              className="inline-flex items-center rounded-full border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="text-sm font-medium">Home</span>
            </NextLink>
          </div>
        </div>
      </div>
    </>
  );
}
