"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Jost } from "next/font/google";
import React from "react";

const jost = Jost({subsets: ['latin']})

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  // fallback initial
  const fallbackInitial = user?.firstName?.[0]?.toUpperCase() ?? "U";

  return (
    <div className={`bg-neutral-950 min-h-screen overflow-hidden ${jost.className}`}>
      {/* Top Header - Fixed */}
      <header className="w-full fixed top-0 left-0 right-0 z-50 bg-neutral-950">
        <div className="max-w-3xl border-b border-neutral-800 mx-auto px-6 py-6 flex items-center justify-between">
          {/* Left side: User Info */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border border-neutral-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-lg font-medium text-neutral-200 border border-neutral-700">
                {fallbackInitial}
              </div>
            )}

            {/* Name + Email */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-100">
                {user?.fullName}
              </span>
              <span className="text-xs text-neutral-400">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium bg-neutral-900 text-neutral-200 rounded-md border border-neutral-800 hover:bg-neutral-800 transition">
              Create Link
            </button>

            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="px-4 py-2 text-sm font-medium bg-neutral-100 text-neutral-900 rounded-md hover:bg-neutral-200 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable with top padding to account for fixed header */}
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-10 min-h-screen overflow-y-auto">
        <div className="flex items-center justify-center flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="300px"
            height="300px"
            viewBox="0 0 48 48"
          >
            {" "}
            <path
              d="M20.3455 13H20.8464H15.491C14.2279 13 13.0299 13.5456 12.2228 14.4883L4 22.9249L13.9362 25L13.5 24.9089"
              stroke="rgba(23, 23, 23, 1)"
              stroke-width="2"
              stroke-miterlimit="10"
              fill="none"
              data-cap="butt"
            ></path>{" "}
            <path
              d="M35 27.5854V27.0854V32.5099C35 33.773 34.4544 34.971 33.5117 35.7781L25.0751 44L23 34.0647L23.0909 34.5"
              stroke="rgba(23, 23, 23, 1)"
              stroke-width="2"
              stroke-miterlimit="10"
              fill="none"
              data-cap="butt"
            ></path>{" "}
            <path
              d="M23 34C34.4138 30.8643 43.4421 21.1155 45 3C26.8845 4.55786 17.1357 13.5862 14 25L23 34Z"
              stroke="rgba(23, 23, 23, 1)"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="square"
              fill="none"
            ></path>{" "}
            <path
              d="M40.9391 18.807C39.1059 13.08 35.2125 9.17375 29.2603 7.0896"
              stroke="rgba(23, 23, 23, 1)"
              stroke-width="2"
              stroke-miterlimit="10"
              fill="none"
              data-cap="butt"
            ></path>{" "}
            <path
              d="M29.5 23C31.9853 23 34 20.9853 34 18.5C34 16.0147 31.9853 14 29.5 14C27.0147 14 25 16.0147 25 18.5C25 20.9853 27.0147 23 29.5 23Z"
              stroke="rgba(23, 23, 23, 1)"
              stroke-width="2"
              stroke-miterlimit="10"
              data-color="color-2"
              fill="none"
              data-cap="butt"
            ></path>{" "}
            <path
              d="M13.7719 41.6528C13.1527 42.2721 9.95885 44.5378 9.95885 44.5378L8.8125 42.6876L4 44.0001C4 44.0001 3.7076 36.8679 6.34733 34.2282C8.79541 31.7801 12.0899 32.291 13.8995 34.1006C15.7091 35.9102 16.22 39.2047 13.7719 41.6528Z"
              stroke="rgba(23, 23, 23, 1)"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="square"
              data-color="color-2"
              fill="none"
            ></path>{" "}
          </svg>{" "}
          <h1 className="text-neutral-800 text-2xl max-w-lg text-center mt-8">
            <h2>No links created yet</h2>
            <h2>Create your first <span className="text-neutral-400">Link</span> now.</h2>
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
