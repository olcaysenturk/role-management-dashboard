"use client";

import { MainSection, PageHeader } from "@/components/ui";
import { useLanguage } from "@/hooks/language/use-language";

export default function AccountView() {
  const { messages } = useLanguage();
  const { name, description, menu } = messages.header.profile;
  const t = messages.account;

  return (
    <MainSection>
      <div className="max-w-xl w-full">
        <PageHeader title={menu.account} description={t.description} />

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-4 border-b border-slate-50 pb-4">
            <span className="text-sm font-medium text-slate-500 col-span-1">{t.fields.fullName}</span>
            <span className="text-sm text-slate-900 col-span-2">{name}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 border-b border-slate-50 pb-4">
            <span className="text-sm font-medium text-slate-500 col-span-1">{t.fields.email}</span>
            <span className="text-sm text-slate-900 col-span-2">info@amerikanhastanesi.com</span>
          </div>
          <div className="grid grid-cols-3 gap-4 border-b border-slate-50 pb-4">
            <span className="text-sm font-medium text-slate-500 col-span-1">{t.fields.role}</span>
            <span className="text-sm text-slate-900 col-span-2">{description}</span>
          </div>
        </div>
      </div>
    </MainSection>
  );
}
