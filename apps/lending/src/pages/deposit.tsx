import Head from "next/head";

import DepositJUSDCForm from "@/components/DepositJUSDCForm";

export default function DepositPage() {
  return (
    <>
      <Head>
        <title>JurisFund Lend | Deposit</title>
        <meta
          name="description"
          content="JurisFund is a credit DeFi protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns."
        />
      </Head>

      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero content */}
          <div className="pb-12 pt-24 md:pb-20 md:pt-24">
            {/* Section header */}
            <div className="pb-12 text-center md:pb-16">
              <div className="mx-auto mt-8 max-w-3xl">
                <div className="flex w-full flex-col justify-center ">
                  <p className="flex flex-col items-center">
                    <span>How much do you want to deposit?</span>
                    <span>(min amount is 0.01 JUSDC)</span>
                  </p>
                  {/* Deposit form */}
                  <DepositJUSDCForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
