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
      <section className="flex h-full content-center items-center justify-center">
        <div className="mt-4">
          <div className="mb-5 text-2xl font-medium text-gray-700">Dashboard</div>
          <div className="container mt-10 border">
            <div className="py-8">
              <div className="py-4">
                <div className="max-w-full overflow-x-auto rounded-lg">
                  <table className="w-full leading-normal text-black">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                        >
                          State
                        </th>
                        <th
                          scope="col"
                          className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                        >
                          Application Filling Date
                        </th>
                        <th
                          scope="col"
                          className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                        >
                          Case No.
                        </th>
                        <th
                          scope="col"
                          className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                        >
                          Case Type
                        </th>
                        <th
                          scope="col"
                          className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
                        >
                          Application Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-black">
                      {applicationsData
                        ? applicationsData.map((application, idx) => (
                            <tr
                              key={idx}
                              className={`${
                                application.applicationStatus === "pending" ||
                                application.applicationStatus === "Pending"
                                  ? "hover:cursor-pointer"
                                  : ""
                              } hover:bg-sky-100`}
                              onClick={() =>
                                application.applicationStatus === "pending" ||
                                application.applicationStatus === "Pending"
                                  ? void handleApplicationSelected(application.id)
                                  : null
                              }
                            >
                              <td className="border-b border-gray-200 p-5 text-sm">
                                <p className="whitespace-nowrap">
                                  {`${application.firstName} ${application.lastName}`}
                                </p>
                              </td>
                              <td className="border-b border-gray-200 p-5 text-sm">
                                <p className="whitespace-nowrap">{`${application.stateLiveIn}`}</p>
                              </td>
                              <td className="border-b border-gray-200 p-5 text-sm">
                                <p className="whitespace-nowrap">
                                  {`${application.applicationFillingDate.toISOString()}`}
                                </p>
                              </td>
                              <td className="border-b border-gray-200 p-5 text-sm">
                                <p className="whitespace-nowrap">{`${application.caseNumber}`}</p>
                              </td>
                              <td className="border-b border-gray-200 p-5 text-sm">
                                <p className="whitespace-nowrap">{`${application.typeOfCase}`}</p>
                              </td>
                              <td
                                className={`border-b border-gray-200 p-5 text-center text-sm ${
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
                  {/* <div className="xs:flex-row xs:justify-between flex flex-col items-center p-5">
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
                      className="w-full border-y bg-white px-4 py-2 text-base text-indigo-500 hover:bg-gray-100"
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="w-full border-y bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-r-xl border-y border-r bg-white p-4  text-base text-gray-600 hover:bg-gray-100"
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
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
