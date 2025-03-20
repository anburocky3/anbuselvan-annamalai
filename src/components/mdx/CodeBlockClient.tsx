"use client";

import React from "react";
import CopyButton from "./CopyButton";

export default function CodeBlockClient({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <CopyButton code={code} />
      {children}
    </div>
  );
}
