"use client";

import { useLanguage } from "@/hooks/language";

export function AppFooter() {
  const { messages } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-sm text-slate-500">
        <span>{messages.footer.brand}</span>
        <span>{messages.footer.copyright}</span>
      </div>
    </footer>
  );
}
