import Head from "next/head";
import { useRouter } from "next/router";

import { api } from "@/utils/api";

export default function Dashboard() {
  // fetch all applications
  const {
    data: applicationsData,
    // error: applicationsError,
    // isLoading: applicationsIsLoading,
  } = api.applications.getAll.useQuery();

  const {
    mutate: dispenseMutation,
    // error: applicationApprovalError,
    // isLoading: applicationApprovalIsLoading,
  } = api.applications.runJob.useMutation();

  const handleDispense = () => {
    dispenseMutation();
  };

  const router = useRouter();

  const handleApplicationSelected = async (applicationID: string) => {
    await router.push(`/applications/${applicationID}`);
  };

  return (
    <>
      <Head>
        <title>JurisFund | Applications List</title>
        <meta
          name="description"
          content="JurisFund is a credit DeFi protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns."
        />
      </Head>
      <section className="flex w-full content-center items-center justify-center bg-red-200 p-2 px-10">
        <div className="mt-4">
          <div className="mb-5">
            <h1 className="mb-3 text-4xl font-medium text-gray-700">Applications</h1>
            <span className="text-md text-gray-500">
              {"This dashboard is for reviewing user's applications looking for funding."}
            </span>
          </div>
          <button
            className="my-3 inline-block rounded-xl bg-blue-800 px-5 py-2 text-xl text-white transition-all duration-150 hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-500"
            onClick={handleDispense}
          >
            dispense
          </button>
          <div className="container mt-6 rounded-lg border border-red-950">
            {/* <div className="py-8"> */}
            {/* <div className="py-4"> */}
            <div className="max-w-full overflow-x-auto rounded-lg">
              <table className="w-full leading-normal text-black">
                <thead className="">
                  <tr className="bg-sky-100">
                    <th
                      scope="col"
                      className="text-md border-b border-red-950 px-5 py-3 text-center font-normal uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-md border-b border-red-950 px-5 py-3 text-center font-normal uppercase"
                    >
                      State
                    </th>
                    <th
                      scope="col"
                      className="text-md border-b border-red-950 px-5 py-3 text-center font-normal uppercase"
                    >
                      Application Filling Date
                    </th>
                    <th
                      scope="col"
                      className="text-md border-b border-red-950 px-5 py-3 text-center font-normal uppercase"
                    >
                      Case No.
                    </th>
                    <th
                      scope="col"
                      className="text-md border-b border-red-950 px-5 py-3 text-center font-normal uppercase"
                    >
                      Case Type
                    </th>
                    <th
                      scope="col"
                      className="text-md border-b border-red-950 px-5 py-3 text-center font-normal uppercase"
                    >
                      Application Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-black ">
                  {applicationsData
                    ? applicationsData.map((application, idx) => (
                        <tr
                          key={idx}
                          className={`${
                            application.applicationStatus === "pending" ||
                            application.applicationStatus === "Pending"
                              ? "hover:cursor-pointer"
                              : ""
                          }  hover:bg-sky-100`}
                          onClick={() =>
                            application.applicationStatus === "pending" ||
                            application.applicationStatus === "Pending"
                              ? void handleApplicationSelected(application.id)
                              : null
                          }
                        >
                          <td className="text-md border-b border-red-950 p-5">
                            <p className="whitespace-nowrap">
                              {`${application.firstName} ${application.lastName}`}
                            </p>
                          </td>
                          <td className="text-md border-b border-red-950 p-5 text-center">
                            <p className="whitespace-nowrap">{`${application.stateLiveIn}`}</p>
                          </td>
                          <td className="text-md border-b border-red-950 p-5 text-center">
                            <p className="whitespace-nowrap">
                              {`${application.applicationFillingDate.toDateString()}`}
                            </p>
                          </td>
                          <td className="text-md border-b border-red-950 p-5 text-center">
                            <p className="whitespace-nowrap">{`${application.caseNumber}`}</p>
                          </td>
                          <td className="text-md border-b border-red-950 p-5">
                            <p className="whitespace-nowrap">{`${application.typeOfCase}`}</p>
                          </td>
                          <td
                            className={`text-md border-b border-red-950 p-5 text-center ${
                              application.applicationStatus.toUpperCase() === "APPROVED"
                                ? "bg-green-300"
                                : application.applicationStatus.toUpperCase() === "REJECTED"
                                ? "bg-red-400"
                                : ""
                            }`}
                          >
                            <p className="whitespace-nowrap">{`${application.applicationStatus.toUpperCase()}`}</p>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              {/* Pagination code */}
              <div className="xs:flex-row xs:justify-between flex flex-col items-center p-5">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="w-full rounded-l-xl border bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                  >
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-full border-y bg-sky-100 px-4 py-2 text-base font-black text-indigo-500 hover:bg-gray-100"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="w-full border bg-sky-100 px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="w-full border-y bg-sky-100 px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="w-full border bg-sky-100 px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                  >
                    4
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-r-xl border-y border-r bg-sky-100 p-4  text-base text-gray-600 hover:bg-gray-100"
                  >
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
