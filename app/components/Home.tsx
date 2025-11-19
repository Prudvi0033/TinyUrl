"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { Instrument_Serif, Jost } from "next/font/google";
import Image from "next/image";
import React from "react";
import Dashboard from "./Dashboard";

const serif = Instrument_Serif({ subsets: ["latin"], weight: ["400"] });
const jost = Jost({ subsets: ["latin"] });

const Home = () => {
  const { user } = useUser();
  const {redirectToSignIn} = useClerk()
  const userId = user?.id;
  const handleClick = () => {
    if (!userId) {
      redirectToSignIn(); 
      return;
    }
    else{
        return (
            <div><Dashboard/></div>
        )
    }
  };
  return (
    <div>
      <div className="relative h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <Image src="/TinyUrlBg.png" alt="bg" fill className="object-cover" />

        <div
          className="z-10 text-[2.8rem]  md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.9] text-center max-w-6xl"
          style={{
            color: "oklch(0.985 0 0)",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          <h1 className={serif.className}>
            <span className="block">Simplify Sharing</span>

            <span className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4">
              <span>clean links with</span>
              <span
                style={{
                  color: "oklch(0.7 0.2 50)", // warm orange that fits dark bg
                }}
              >
                TinyUrl
              </span>
            </span>
          </h1>

          <div className={`text-[12px] md:text-lg lg:text-xl mt-6 sm:mt-8 ${jost.className} text-neutral-200 px-4`}>
            <p className="">
              Create powerful, customizable short URLs tailored to your needs.
            </p>
            <p className="">Track every click and last-visit instantly.</p>
          </div>

          <button
          onClick={() => handleClick()}
            className={`px-5 py-2.5 sm:px-7 sm:py-3 mt-6 sm:mt-8 ${jost.className} rounded-xl text-base sm:text-lg bg-neutral-900 text-white cursor-pointer border border-neutral-800 hover:scale-105 transition-transform shadow-[inset_0px_2px_6px_-2px_rgba(255,255,255,0.16)]`}
          >
            Create Short Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;