"use client";

import { MainSection } from "./components/ui";
import { useLanguage } from "./hooks/language";

export default function Home() {
  const { messages } = useLanguage();

  return (
    <MainSection>
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {messages.home.title}
        </h1>
      </div>
    </MainSection>
  );
}
