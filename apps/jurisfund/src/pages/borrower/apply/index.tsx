import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";

import { useAppContext } from "@/contexts/AppContext";
import { api } from "@/utils/api";

export default function BorrowerApplicationFormPage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [stateLiveIn, setStateLiveIn] = React.useState("");

  const [typeOfCase, setTypeOfCase] = React.useState(""); // options: Auto Accident - Workers' Compensation - Slip and Fall (Injury on Others' Property) - Wrongful Termination (Employment)
  const [alreadyWorkingWithAttorney, setAlreadyWorkingWithAttorney] = React.useState("");
  const [lawFirmName, setLawFirmName] = React.useState("");
  const [lawyerName, setLawyerName] = React.useState("");
  const [expectedSettlementAmount, setExpectedSettlementAmount] = React.useState("");

  const router = useRouter();

  const { connectedAddress, connectedEmbeddedWallet, connectedEmail } = useAppContext();

  React.useEffect(() => {
    if (connectedEmbeddedWallet !== "" && connectedEmail !== "") {
      setEmail(connectedEmail);
    }
  }, [connectedEmail, connectedEmbeddedWallet]);

  const { mutate: applicationsAddMutate /*, isLoading: applicationsAddIsLoading */ } =
    api.applications.add.useMutation({
      // onMutate: async (newEntry) => {
      //   await api.applications.getAll.invalidateQueries;
      //   api.applications.getAll.setData(undefined, (prevEntri es) => {
      //     if (prevEntries) {
      //       return [newEntry, ...prevEntries];
      //     } else {
      //       return [newEntry];
      //     }
      //   });
      // },
      // onSettled: async () => {
      //   await api.applications.getAll.invalidate();
      // },
      onSuccess: async () => {
        await router.push("/borrower/apply/success");
      },
      onError(error, variables /*, context */) {
        console.error({ error, variables });
        alert("An error occurred while submitting the form.");
      },
    });

  return (
    <>
      <Head>
        <title>JurisFund | Application Form</title>
        <meta
          name="description"
          content="JurisFund is a credit DeFi protocol backed by consumer pre-settlement funding. This protocol offers investors an opportunity to get exposure to a unique asset class, notable for its lack of correlation with broader market trends and its history of high returns."
        />
      </Head>
      <section className="relative w-[60%] gap-2">
        <form
          className="flex flex-col gap-4 rounded-md border-2 border-orange-300 bg-orange-100 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (connectedEmbeddedWallet === undefined) return;
            applicationsAddMutate({
              firstName,
              lastName,
              email,
              phoneNumber,
              stateLiveIn,
              typeOfCase,
              alreadyWorkingWithAttorney,
              lawFirmName,
              lawyerName,
              expectedSettlementAmount,
              walletAddress: connectedEmbeddedWallet ?? connectedAddress,
            });
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setStateLiveIn("");
            setTypeOfCase("");
            setAlreadyWorkingWithAttorney("");
            setLawFirmName("");
            setLawyerName("");
            setExpectedSettlementAmount("");
          }}
        >
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">First Name</label>
            <input
              type="text"
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
              placeholder="Your First Name..."
              minLength={2}
              maxLength={100}
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">Last Name</label>
            <input
              type="text"
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
              placeholder="Your Last Name..."
              minLength={2}
              maxLength={100}
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">Email</label>
            <input
              type="email"
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
              placeholder="Your Email..."
              minLength={2}
              maxLength={100}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">Phone Number</label>
            <input
              type="phone"
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
              placeholder="Your Phone Number..."
              minLength={2}
              maxLength={100}
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">What state do you live in the USA?</label>
            <select
              value={stateLiveIn}
              onChange={(event) => {
                setStateLiveIn(event.target.value);
              }}
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row min-w-[50%] text-black">What kind of case do you have?</label>
            <select
              value={typeOfCase}
              onChange={(event) => {
                setTypeOfCase(event.target.value);
              }}
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
            >
              <option value="Auto Accident">Auto Accident</option>
              <option value="Worker's Compensation">{"Worker's Compensation"}</option>
              <option value="Slip and Fall (Injury on Other's Property)">
                {"Slip and Fall (Injury on Other's Property)"}
              </option>
              <option value="Wrongful Termination (Employment)">
                Wrongful Termination (Employment)
              </option>
              <option value="FTX Bankruptcy Claim">FTX Bankruptcy Claim</option>
            </select>
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">
              Are you currently working with an attorney and have a case pending?
            </label>
            <div className="flex gap-4">
              <input // checkbox options: Yes or No
                type="checkbox"
                className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
                checked={alreadyWorkingWithAttorney === "yes"}
                onChange={() => {
                  setAlreadyWorkingWithAttorney("yes");
                }}
              />
              <label className="row w-[50%] text-black">Yes</label>
              <input
                type="checkbox"
                className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
                checked={alreadyWorkingWithAttorney === "no"}
                onChange={() => {
                  setAlreadyWorkingWithAttorney("no");
                }}
              />
              <label className="row w-[50%] text-black">No</label>
            </div>
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">Law Firm Name</label>
            <input
              type="text"
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
              placeholder="Your Law Firm Name..."
              minLength={2}
              maxLength={100}
              value={lawFirmName}
              onChange={(event) => {
                setLawFirmName(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">Lawyer Name</label>
            <input
              type="text"
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
              placeholder="Lawyer Name..."
              minLength={2}
              maxLength={100}
              value={lawyerName}
              onChange={(event) => {
                setLawyerName(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-row content-center gap-4 text-center">
            <label className="row w-[50%] text-black">Expected Settlement Amount in USD</label>
            <input
              type="number"
              className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-yellow-100 focus:outline-none"
              placeholder="Expected Settlement Amount in USD..."
              minLength={2}
              maxLength={100}
              value={expectedSettlementAmount}
              onChange={(event) => {
                setExpectedSettlementAmount(event.target.value);
              }}
            />
          </div>
          {connectedAddress === "" ||
          connectedEmbeddedWallet === "" ||
          connectedAddress === "0x0" ||
          connectedEmail === "" ? (
            <DynamicWidget />
          ) : (
            <button
              type="submit"
              className="mx-auto mt-16 w-[30%] rounded-md border-2 border-indigo-700 bg-slate-600 p-2 text-indigo-400 hover:border-zinc-800 hover:bg-orange-300 hover:text-zinc-800 focus:outline-none"
            >
              Submit
            </button>
          )}
        </form>
      </section>
    </>
  );
}
