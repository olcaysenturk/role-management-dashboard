"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/language/use-language";

export function Logo() {
  const { messages } = useLanguage();

  return (
    <Link href="/user-management" className="flex items-center transition hover:opacity-80">
      <img 
        src="/assets/images/logo.webp" 
        alt={messages.header.logo.primary + " " + messages.header.logo.secondary}
        className="h-10 w-auto object-contain"
      />
    </Link>
  );
}
