"use client";

import { useEffect, useState } from "react";
import CreateLinkModal from "./CreateLinkModal";
import { useUser, useClerk } from "@clerk/nextjs";
import { Jost } from "next/font/google";
import { Link } from "@prisma/client";
import {
  ChartNoAxesColumn,
  Check,
  Clipboard,
  CornerDownRight,
  Trash,
} from "lucide-react";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { toast } from "sonner";

const jost = Jost({ subsets: ["latin"] });

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);

  const fallbackInitial = user?.firstName?.[0]?.toUpperCase() ?? "U";

  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyLink = async (url: string, code: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedCode(code);

    setTimeout(() => {
      setCopiedCode(null);
    }, 1000);
  };

  const handleDelete = async (code: string) => {
    try {
      await fetch(`/api/links/${code}`, {
      method: 'DELETE'
    })

    toast("Deleted the link")

    const updated = await fetchLinks()
    setLinks(updated)
    } catch (error) {
      console.log("Error deleting the link", error);
      toast("Error deleting link")
    }
  }

  const fetchLinks = async (): Promise<Link[]> => {
    const res = await fetch("/api/links");
    return res.json();
  };

  useEffect(() => {
    async function load() {
      const data = await fetchLinks();
      setLinks(data);
      setLoading(false);
    }

    load();
  }, []);

  const handleCreated = async () => {
    const data = await fetchLinks();
    setLinks(data);
  };

  if (loading) return <DashboardSkeleton/>

  return (
    <div
      className={`bg-neutral-950 min-h-screen overflow-hidden ${jost.className}`}
    >
      {/* HEADER */}
      <header className="w-full fixed top-0 left-0 right-0 z-50 bg-neutral-950">
        <div className="max-w-3xl border-b border-neutral-800 mx-auto px-6 py-6 flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center gap-3">
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

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-neutral-100">
                {user?.fullName}
              </span>
              <span className="text-xs text-neutral-400">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-sm font-medium bg-neutral-900 text-neutral-200 rounded-md border border-neutral-800 hover:bg-neutral-800 transition"
            >
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

      {/* MAIN */}
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-10">
        {links.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {links.map((link) => {
              const shortUrl = `${baseUrl}/${link.code}`;

              return (
                <div
                  key={link.id}
                  className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-neutral-100 font-semibold">
                        {link.title}
                      </h3>

                      <div className="mb-2">
                        <a
                          href={shortUrl}
                          target="_blank"
                          className="text-blue-400 text-sm underline mt-1 inline-block"
                        >
                          {shortUrl}
                        </a>
                      </div>

                      <p className="text-neutral-400 text-sm flex items-center gap-x-2">
                        <span>
                          <CornerDownRight size={14} />
                        </span>
                        <span>{link.redirectUrl}</span>
                      </p>
                    </div>

                    <div className="flex gap-x-2 px-4 text-neutral-300">
                      <span
                        className="bg-neutral-700 p-2 rounded-lg hover:bg-neutral-600 cursor-pointer transition-all"
                        onClick={() => handleCopyLink(shortUrl, link.code)}
                      >
                        {copiedCode === link.code ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Clipboard size={14} />
                        )}
                      </span>
                      <span className="bg-neutral-700 p-2 rounded-lg hover:bg-neutral-600 cursor-pointer transition-all">
                        <ChartNoAxesColumn size={14} />
                      </span>
                      <span onClick={() => handleDelete(link.code)} className="bg-neutral-700 hover:text-red-700 p-2 rounded-lg hover:bg-neutral-600 cursor-pointer transition-all">
                        <Trash size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal */}
      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
};

export default Dashboard;

function EmptyState() {
  return (
    <div className="flex items-center justify-center flex-col text-neutral-400">
      <h2 className="text-xl mt-6">No Links Yet</h2>
      <p>Create your first link now.</p>
    </div>
  );
}
