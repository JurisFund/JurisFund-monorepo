import { useRouter } from "next/router";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const matches = useMediaQuery("(max-width: 480px)");
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between pb-10 ">
        {pathname === "/" ? (
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -z-10 w-full -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <svg
              width={matches ? "180" : "1360"}
              height={matches ? "425" : "578"}
              viewBox={matches ? "0 0 480 180" : "0 0 1360 578"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                  <stop stopColor="#89CFF0" offset="0%" />
                  <stop stopColor="#6495ED" offset="77.402%" />
                  <stop stopColor="#2dd4bf" offset="100%" />
                </linearGradient>
              </defs>
              <g fill="url(#illustration-01)" fillRule="evenodd">
                <circle
                  cx={matches ? "225" : "1232"}
                  cy={matches ? "125" : "128"}
                  r={matches ? "125" : "128"}
                />
                <circle cx="155" cy="443" r="64" />
              </g>
            </svg>
          </div>
        ) : null}

        {children}
      </main>
      <Footer />
    </>
  );
};
