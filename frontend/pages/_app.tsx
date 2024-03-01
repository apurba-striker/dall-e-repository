import Link from "next/link";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header
        className="w-full flex justify-between items-center
         bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
      >
        <Link href="/">
          <img
            src={"/assets/logo.svg"}
            alt="logo"
            className="w-28 object-contain"
          />
        </Link>
        <Link
          href="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] ">

      <Component {...pageProps} />
      
      </main>
    </>
  );
}

export default MyApp;
