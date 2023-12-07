import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>JurisFund Lend | Home</title>
        <meta
          name="description"
          content="JurisFund is a credit DeFi protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns."
        />
      </Head>

      <section className="relative">
        {/* Illustration behind hero content */}
        <div
          className="-z-1 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 transform"
          aria-hidden="true"
        >
          <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                <stop stopColor="#89CFF0" offset="0%" />
                <stop stopColor="#6495ED" offset="77.402%" />
                <stop stopColor="#2dd4bf" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero content */}
          <div className="pb-12 pt-24 md:pb-20 md:pt-24">
            {/* Section header */}
            <div className="pb-12 text-center md:pb-16">
              <h1
                className="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl"
                data-aos="zoom-y-out"
              >
                Juris
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Fund
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Lending
                </span>
                Protocol
              </h1>
              <div className="mx-auto mt-8 max-w-3xl">
                <div className="flex justify-center  ">
                  {/* Here is your card */}
                  <div className="transform  transition duration-300 hover:scale-105">
                    <div className="relative z-0 m-[12px] block min-w-[200px] max-w-[262px] overflow-hidden rounded-[4px] bg-[#black] bg-gradient-to-bl from-black to-blue-500 p-[32px]  no-underline contrast-50  duration-500 hover:contrast-100">
                      <p className="text-[17px] font-normal leading-[14px] text-[#white]">
                        Max Pool Size
                      </p>
                      <p className="mt-2 font-mono text-lg  leading-[14px] text-[#white]">
                        500,000 USDC
                      </p>
                    </div>
                  </div>
                  <div className="transform transition duration-300 hover:scale-105">
                    <div className="relative z-0 m-[12px] block min-w-[200px] max-w-[262px] overflow-hidden rounded-[4px] bg-[#black] bg-gradient-to-bl from-black to-blue-500 p-[32px]  no-underline contrast-50  duration-500 hover:contrast-100">
                      <p className="text-[17px] font-normal leading-[14px] text-[#white]">
                        Projected APY
                      </p>
                      <p className="mt-2 font-mono text-lg  leading-[14px] text-[#white]">15%</p>
                    </div>
                  </div>
                  <div className="transform transition duration-300 hover:scale-105">
                    <div className="relative z-0 m-[12px] block min-w-[200px] max-w-[262px] overflow-hidden rounded-[4px] bg-[#black] bg-gradient-to-bl from-black to-blue-500 p-[32px]  no-underline contrast-50  duration-500 hover:contrast-100">
                      <p className="text-[17px] font-normal leading-[14px] text-[#white]">
                        Loan Terms
                      </p>
                      <p className="mt-2 font-mono  text-lg leading-[14px] text-[#white]">
                        12 months
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <button
                    className="text-md mt-12 inline-flex 
        animate-bounce rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 px-4 py-2 font-medium tracking-wide text-white hover:animate-none 
        focus:animate-none"
                  >
                    <span className="ml-2 font-bold uppercase">Deposit USDC</span>
                  </button>
                </div>

                {/* DEV_NOTE: copmmented buttons block div in order to clean the page, leaving it here
                for reference */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
