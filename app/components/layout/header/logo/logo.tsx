"use client";

import { useLanguage } from "../../../../hooks/language";

export function Logo() {
  const { messages } = useLanguage();

  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
        {messages.header.logo.primary}
      </span>
      <span className="text-lg font-semibold text-[#e20a17]">
        {messages.header.logo.secondary}
      </span>
    </div>
  );
}
