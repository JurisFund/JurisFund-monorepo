// import Image from "next/image";
// import { ReactNode } from "react";
import * as React from "react";
import { Button } from "ui";

// interface Props {
//   children: ReactNode
//   content: Omit<Authors, '_id' | '_raw' | 'body'>
// }

export default function BorrowersPage() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 text-center md:space-y-5">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
            Apply for funding
          </h1>
        </div>
        <div className="items -start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 ">
            <h3 className="pb-2 pt-4 text-xs leading-8 tracking-tight md:text-xl md:font-bold">
              {
                "Are you an FTX creditor and urgently need liquidity while waiting to recover your deposits from the FTX bankruptcy claims?"
              }
            </h3>
            <div className="text-gray-500 dark:text-gray-400 md:font-bold">
              {
                "Did you run into a car accident and are going through financial hardships while awaiting the settlement check from the insurance company of the counterparty?"
              }
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-400 md:text-xl">
              {"Are you ready to get your life back on track?"}
            </div>
            <div className="text-md p-4 text-gray-500 dark:text-gray-400 md:text-xl md:font-bold">
              {"Get a non-recourse loan backed by your pre-settlement claims."}
            </div>
            <div className="font-bold text-gray-700 dark:text-gray-400">
              {"No risk; if you lose your case, you don't pay us back."}
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none pb-8 pt-8 xl:col-span-2"></div>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8"></div>
          <div className="prose dark:prose-invert max-w-none gap-8 pb-8 pt-8 text-center md:gap-0 md:text-left xl:col-span-2">
            <div className="pb-2 pt-4 leading-8 tracking-tight md:font-bold">
              {"Advances are typically 10-15% of the settlement value."}
            </div>
            <div className="leading-8 tracking-tight md:pb-2 md:pt-4 md:font-bold">
              {"The annual interest rate (APR) is in the range of 20-30%."}
            </div>
            <div className="leading-8 tracking-tight md:pb-2 md:pt-4 md:font-bold">
              {
                "No repayment of the principal or interest is due until a settlement has been awarded."
              }
            </div>
            <div className="leading-8 tracking-tight md:pb-2 md:pt-4 md:font-bold">
              {"Interest compounds monthly."}
            </div>
          </div>
          <Button className="w-[75%] rounded bg-blue-500 font-bold text-white hover:bg-blue-700 md:px-4 md:py-2">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
