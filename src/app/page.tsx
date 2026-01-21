"use client";

import * as React from "react";
import Footer from "../components/ui/footer";
import SearchFL from "./components/searchF";
import { ThemeToggle } from "./components/ThemeToggle";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/fl_d.svg" : "/fl.svg";

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="relative">
        {/* <div className="absolute flex justify-end p-4">
          <ThemeToggle />
        </div> */}
        <Image
          src={logoSrc}
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto w-full"
        />
      </div>

      <main className="mx-10 flex-grow">
        <SearchFL />
      </main>
      <footer className="py-4 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
