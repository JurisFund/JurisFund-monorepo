import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import { api } from "@/utils/api";

export default function ApplicationDetailPage() {
  const router = useRouter();

  const [currentApplicationID, setCurrentApplicationID] = React.useState<string>("");
  const [applicationPreApproved, setApplicationPreApproved] = React.useState<boolean>(false);

  const [loanAmount, setLoanAmount] = React.useState<string>("");
  const [interestRate, setInterestRate] = React.useState<string>("");
  const [lawyerWalletAddress, setLawyerWalletAddress] = React.useState<string>("");

  const { applicationID } = router.query;

  React.useEffect(() => {
    if (applicationID !== undefined && applicationID.length > 0 && applicationID[0] !== undefined) {
      setCurrentApplicationID(applicationID[0]);
    }
  }, [applicationID]);

  const {
    data: applicationData,
    // error: applicationError,
    // isLoading: applicationIsLoading,
  } = api.applications.getByID.useQuery(
    { applicationID: currentApplicationID },
    {
      enabled: currentApplicationID !== "",
    },
  );

  const handleApplicationPreApproval = () => {
    setApplicationPreApproved(true);
  };

  const {
    mutate: applicationApprovalMutation,
    // error: applicationApprovalError,
    // isLoading: applicationApprovalIsLoading,
  } = api.applications.update.useMutation({
    onSuccess: async () => {
      await router.push("/applications");
    },
  });

  return (
    <>
      <Head>
        <title>JurisFund | Application Detail</title>
        <meta
          name="description"
          content="JurisFund is a credit DeFi protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns."
        />
      </Head>
      <section className="relative content-center items-center gap-10 text-center align-middle">
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">Application Filling Date</label>
          <span>{applicationData?.applicationFillingDate.toDateString()}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">First Name</label>
          <span>{applicationData?.firstName}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">Last Name</label>
          <span>{applicationData?.lastName}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">Email</label>
          <span>{applicationData?.email}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">Phone Number</label>
          <span>{applicationData?.phoneNumber}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">What state do you live in the USA?</label>
          <span>{applicationData?.stateLiveIn}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row min-w-[50%] text-black">What kind of case do you have?</label>
          <span>{applicationData?.typeOfCase}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">
            Are you currently working with an attorney and have a case pending?
          </label>
          <span>{applicationData?.alreadyWorkingWithAttorney}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">Law Firm Name</label>
          <span>{applicationData?.lawFirmName}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">Lawyer Name</label>
          <span>{applicationData?.lawyerName}</span>
        </div>
        <div className="mx-24 flex flex-row content-center gap-4 border-2 text-center">
          <label className="row w-[50%] text-black">Expected Settlement Amount in USD</label>
          <span>{applicationData?.expectedSettlementAmount}</span>
        </div>

        {!applicationPreApproved ? (
          <button
            type="button"
            className="text-white-400 mx-auto mt-6 w-[50%] rounded-md border-2 border-indigo-700 bg-green-400 p-2 hover:border-zinc-800 hover:bg-green-600 hover:text-xl hover:text-zinc-800 focus:outline-none"
            onClick={handleApplicationPreApproval}
          >
            Approve
          </button>
        ) : (
          <form
            className="bg-orange-200-900 mx-60 flex flex-col gap-4 rounded-md border-2 border-orange-300 p-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (
                currentApplicationID === "" ||
                loanAmount === "" ||
                interestRate === "" ||
                lawyerWalletAddress === ""
              )
                return;
              applicationApprovalMutation({
                applicationID: currentApplicationID,
                loanAmount,
                interestRate,
                lawyerWalletAddress,
              });
              setCurrentApplicationID("");
              setLoanAmount("");
              setInterestRate("");
              setLawyerWalletAddress("");
            }}
          >
            {/* Namely, loan amount, interest rate (APR), lawyer wallet address. */}
            {/* <div className="flex flex-row content-center gap-4 text-center">
              <label className="row w-[50%] text-black">Namely</label>
              <input
                type="text"
                className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
                placeholder="Your Email..."
                minLength={2}
                maxLength={100}
                value={namely}
                onChange={(event) => {
                  setNamely(event.target.value);
                }}
              />
            </div> */}

            <div className="flex flex-row content-center gap-4 text-center">
              <label className="row w-[50%] text-black">Loan Amount</label>
              <input
                type="text"
                className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
                placeholder="Enter the Loan Ammount value..."
                minLength={2}
                maxLength={100}
                value={loanAmount}
                onChange={(event) => {
                  setLoanAmount(event.target.value);
                }}
              />
            </div>

            <div className="flex flex-row content-center gap-4 text-center">
              <label className="row w-[50%] text-black">Interest Rate (APR)</label>
              <input
                type="text"
                className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
                placeholder="Enter the Interest Rate value..."
                minLength={2}
                maxLength={100}
                value={interestRate}
                onChange={(event) => {
                  setInterestRate(event.target.value);
                }}
              />
            </div>

            <div className="flex flex-row content-center gap-4 text-center">
              <label className="row w-[50%] text-black">Lawyer wallet address</label>
              <input
                type="text"
                className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
                placeholder="Enter the Lawyer wallet address..."
                minLength={2}
                maxLength={100}
                value={lawyerWalletAddress}
                onChange={(event) => {
                  setLawyerWalletAddress(event.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-slate-600-800 mx-auto w-[50%] rounded-md border-2 border-indigo-700 p-2 text-indigo-400 hover:border-zinc-800 hover:bg-orange-300 hover:text-zinc-800 focus:outline-none"
              disabled={
                currentApplicationID === "" ||
                loanAmount === "" ||
                interestRate === "" ||
                lawyerWalletAddress === ""
              }
            >
              Approve Application
            </button>
          </form>
        )}
      </section>
    </>
  );
}
