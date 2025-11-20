"use client";

import { useState } from "react";
import { Link } from "../types/link";

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (link: Link) => void;
}

export default function CreateLinkModal({
  isOpen,
  onClose,
  onCreated,
}: CreateLinkModalProps) {
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setError("");

    if (!redirectUrl.trim()) {
      setError("Redirect URL is required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        body: JSON.stringify({ redirectUrl, title, code }),
      });

      const data: Link | { error: string } = await res.json();

      if (!res.ok) {
        setError((data as { error: string }).error || "Something went wrong");
        setLoading(false);
        return;
      }

      onCreated(data as Link);
      onClose();
    } catch (err) {
      setError(`Failed to create link. ${err}`, );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-xl w-full max-w-md border border-neutral-800">
        <h2 className="text-lg font-semibold text-neutral-100 mb-4">Create New Link</h2>

        {/* Redirect URL */}
        <label className="text-neutral-300 text-sm">Redirect URL</label>
        <input
          type="text"
          className="w-full mt-1 mb-4 px-3 py-2 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700"
          placeholder="https://example.com"
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
        />

        {/* Title optional */}
        <label className="text-neutral-300 text-sm">
          Title <span className="text-neutral-500">(optional)</span>
        </label>
        <input
          type="text"
          className="w-full mt-1 mb-4 px-3 py-2 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700"
          value={title}
          placeholder="My Blog"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Code optional */}
        <label className="text-neutral-300 text-sm">
          Custom Code <span className="text-neutral-500">(optional)</span>
        </label>
        <input
          type="text"
          className="w-full mt-1 mb-4 px-3 py-2 rounded-md bg-neutral-800 text-neutral-100 border border-neutral-700"
          placeholder="custom123"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-neutral-800 text-neutral-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
