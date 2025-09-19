import * as React from "react";
import SearchF from "./components/searchF";
import Footer from "../components/ui/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="flex justify-center text-6xl font-bold my-10 text-blue-600 font-sans underline">
        Flights Fetch
      </h1>
      <p className=" mx-10 text-center text-xl my-10 text-gray-600 font-sans">
        ✈️ We use{" "}
        <Link href="https://rapidapi.com/apiheya/api/sky-scrapper/playground/apiendpoint_9c350fd4-7208-4d87-905d-6906793c6f80">
          <span className="font-bold text-blue-500 underline">RapidAPI</span>{" "}
        </Link>{" "}
        flight APIs to bring you real-time flight information. Currently,
        flights are shown{" "}
        <span className="font-bold text-blue-500">only within the USA</span>.
      </p>
      <p className="bg-blue-500 shadow-md mb-4 rounded-md p-2 mx-10 text-white text-center text-xl font-sans">
        Tip: Press the <span className="font-bold ">N</span> key{" "}
        <span className="italic ">for example</span> to quickly select your
        arrival and destination airports.
        <br />
        Select your arrival <span className="font-bold "> New York </span>, and
        destination airport <span className="font-bold ">Newcastle</span>, and
        Then change the date, the click the search button.
      </p>
      <main className="mx-10 flex-grow">
        <SearchF />
      </main>
      <footer className="py-4 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
