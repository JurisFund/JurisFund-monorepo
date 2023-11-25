import * as React from "react";

export default function BorrowerFormPage() {
  const [message, setMessage] = React.useState("");

  // const postMessage = api.guestbook.postMessage.useMutation();

  // const utils = api.useContext();
  // const postMessage = api.guestbook.postMessage.useMutation({
  //   onMutate: async (newEntry) => {
  //     await utils.guestbook.getAll.cancel();
  //     utils.guestbook.getAll.setData(undefined, (prevEntries) => {
  //       if (prevEntries) {
  //         return [newEntry, ...prevEntries];
  //       } else {
  //         return [newEntry];
  //       }
  //     });
  //   },
  //   onSettled: async () => {
  //     await utils.guestbook.getAll.invalidate();
  //   },
  // });

  return (
    <section className="relative  gap-2 ">
      <form
        className="bg-orange-200-900 mx-60 flex flex-col gap-4 rounded-md border-2 border-orange-300 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          // postMessage.mutate({
          //   name: session.user?.name as string,
          //   message,
          // });
          setMessage("");
        }}
      >
        <div className="flex flex-row content-center gap-4 text-center">
          <label className="row w-[50%] text-black">Name</label>
          <input
            type="text"
            className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
            placeholder="Your message..."
            minLength={2}
            maxLength={100}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-row content-center gap-4 text-center">
          <label className="row w-[50%] text-black">Name</label>
          <input
            type="text"
            className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
            placeholder="Your message..."
            minLength={2}
            maxLength={100}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-row content-center gap-4 text-center">
          <label className="row w-[50%] text-black">Name</label>
          <input
            type="text"
            className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
            placeholder="Your message..."
            minLength={2}
            maxLength={100}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-row content-center gap-4 text-center">
          <label className="row w-[50%] text-black">Name</label>
          <input
            type="text"
            className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
            placeholder="Your message..."
            minLength={2}
            maxLength={100}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-row content-center gap-4 text-center">
          <label className="row w-[50%] text-black">Name</label>
          <input
            type="text"
            className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
            placeholder="Your message..."
            minLength={2}
            maxLength={100}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-row content-center gap-4 text-center">
          <label className="row w-[50%] text-black">Name</label>
          <input
            type="text"
            className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
            placeholder="Your message..."
            minLength={2}
            maxLength={100}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-row content-center gap-4 text-center">
          <label className="row w-[50%] text-black">Name</label>
          <input
            type="text"
            className="row rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
            placeholder="Your message..."
            minLength={2}
            maxLength={100}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-slate-600-800 mx-auto w-[50%] rounded-md border-2 border-indigo-700 p-2 text-indigo-400 hover:border-zinc-800 hover:bg-orange-300 hover:text-zinc-800 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
