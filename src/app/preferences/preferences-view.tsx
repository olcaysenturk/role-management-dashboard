"use client";

import { MainSection, PageHeader } from "@/components/ui";
import { useLanguage } from "@/hooks/language/use-language";
import { availableLocales } from "@/lib/i18n";

export default function PreferencesView() {
  const { messages, locale, setLocale } = useLanguage();
  const { menu } = messages.header.profile;
  const t = messages.preferences;

  return (
    <MainSection>
      <div className="max-w-xl w-full">
        <PageHeader title={menu.preferences} description={t.description} />

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <span className="text-sm font-medium text-slate-500">
              {t.language.title}
            </span>

            <div className="flex bg-slate-100 p-1 rounded-full">
              {availableLocales.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setLocale(val)}
                  className={`cursor-pointer flex items-center justify-center min-w-[70px] px-3 py-1.5 text-xs font-semibold rounded-full transition-all uppercase ${locale === val
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {messages.header.language.options[val]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainSection>
  );
}
