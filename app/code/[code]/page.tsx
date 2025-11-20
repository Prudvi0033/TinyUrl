"use client";
export const dynamic = "force-dynamic";
import { Link } from "@/app/types/link";
import { ArrowLeft, Calendar, MousePointer } from "lucide-react";
import { Jost } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const jost = Jost({ subsets: ["latin"] });

const Page = () => {
  const { code } = useParams();
  const router = useRouter();
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    const getLinkInfo = async () => {
      try {
        const res = await fetch(`/api/links/${code}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch link");
        } else {
          setLink(data);
        }
      } catch (err) {
        console.error("Error getting link info", err);
        setError("Failed to fetch link");
      } finally {
        setLoading(false);
      }
    };

    getLinkInfo();
  }, [code]);

  return (
    <div className={`bg-neutral-950 min-h-screen ${jost.className}`}>
      {/* HEADER */}
      <header className="w-full fixed top-0 left-0 right-0 bg-neutral-950 z-50">
        <div className="max-w-3xl border-b border-neutral-800 mx-auto px-6 py-6 flex items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className="flex cursor-pointer hover:underline items-center justify-start gap-x-3 text-neutral-300"
          >
            <ArrowLeft size={16} />
            <span>Back to links</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-28 max-w-3xl mx-auto px-6">
        {/* Loading Skeleton */}
        {loading && (
          <div className="animate-pulse bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
            <div className="h-10 w-3/4 bg-neutral-800 rounded-md"></div>
            <div className="h-6 w-full bg-neutral-800 rounded-md"></div>
            <div className="h-6 w-1/2 bg-neutral-800 rounded-md"></div>
            <div className="flex gap-x-6 mt-4">
              <div className="flex flex-col gap-y-2 w-24">
                <div className="h-4 bg-neutral-800 rounded-md"></div>
                <div className="h-4 bg-neutral-800 rounded-md"></div>
              </div>
              <div className="flex flex-col gap-y-2 w-48">
                <div className="h-4 bg-neutral-800 rounded-md"></div>
                <div className="h-4 bg-neutral-800 rounded-md"></div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-400">{error}</p>}

        {/* Link Card */}
        {link && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4 shadow-md">
            <h1 className="text-3xl font-semibold text-white">{link.title}</h1>
            <p className="text-neutral-400 break-words">
              Redirects to:{" "}
              <a
                href={link.redirectUrl}
                target="_blank"
                className="underline hover:text-white"
              >
                {link.redirectUrl}
              </a>
            </p>
            <p className="text-neutral-500">
              Code: <span className="text-neutral-300">{link.code}</span>
            </p>

            <div className="flex flex-col gap-y-4 text-neutral-400 mt-4">
              <div className="flex gap-x-2 items-start gap-y-1">
                <div className="flex items-center gap-x-2">
                  <MousePointer size={18} />
                  <span className="font-medium text-neutral-300">Clicks:</span>
                </div>
                <span className="text-white">{link.clicks}</span>
              </div>

              <div className="flex items-start gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Calendar size={18} />
                  <span className="font-medium text-neutral-300">Last Clicked:</span>
                </div>
                <span className="text-white">
                  {link.lastClicked
                    ? new Date(link.lastClicked).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Never"}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
