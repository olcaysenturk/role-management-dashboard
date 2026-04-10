"use client";

import { useLanguage } from "@/hooks/language";

export function Logo() {
  const { messages } = useLanguage();

  return (
    <div className="flex items-center">
      <img 
        src="/assets/images/logo.webp" 
        alt={messages.header.logo.primary + " " + messages.header.logo.secondary}
        className="h-10 w-auto object-contain"
      />
    </div>
  );
}
