"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");

      // Reset copy state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy code");
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute top-2 right-2 rounded-md p-2 text-xs bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
      aria-label="Copy code to clipboard"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
