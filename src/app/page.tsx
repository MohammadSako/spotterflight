import * as React from "react";
import SearchF from "./components/searchF";
import Footer from "../components/ui/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="flex justify-center text-6xl font-bold my-10 text-blue-600 font-sans underline">
        Flights Fetch
      </h1>
      <main className="mx-10 flex-grow">
        <SearchF />
      </main>
      <footer className="py-4 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
