import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import NextLink from "next/link";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <>
      <Head>
        <title>JurisFund Admin | Home</title>
        <meta
          name="description"
          content="JurisFund is a tokenized private credit protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns."
        />
      </Head>

      <section className="w-full">
        <div className="max-w-screen-xs mx-auto px-4 sm:px-6 md:max-w-6xl">
          {/* Hero content */}
          <div className="pb-14 pt-10 md:pb-20 md:pt-20">
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
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Admin
                </span>
                Panel
              </h1>
              <div className="mx-auto max-w-3xl">
                <div
                  // className="content-between justify-between align-middle xl:mx-auto xl:max-w-xs"
                  className="flex w-full "
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div
                    className="flex w-full content-center items-center justify-center text-center"
                    // className="relative"
                  >
                    {address !== undefined && isConnected ? (
                      <NextLink
                        className="btn w-full rounded-lg	bg-gray-900 p-4 text-white hover:bg-gray-400 "
                        href="/applications"
                      >
                        Enter admin portal
                      </NextLink>
                    ) : (
                      <ConnectButton label="Login to your admin account" />
                    )}
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
