"use client";

import { ChevronDownIcon, GlobeIcon } from "../../../icons";
import { HeaderDropdown } from "../../../ui/header-dropdown";
import { useDropdown } from "../../../../hooks/dropdown";
import { useLanguage } from "../../../../hooks/language";
import { availableLocales, type Locale } from "../../../../lib/i18n";

const triggerClassName =
  "flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 text-left shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300 focus:bg-slate-50 focus:outline-none";

export function LanguageSwitch() {
  const { locale, messages, setLocale } = useLanguage();
  const { containerRef, isOpen, setIsOpen } = useDropdown();
  const language = messages.header.language;

  function handleSelect(nextLocale: Locale) {
    setLocale(nextLocale);
    setIsOpen(false);
  }

  const trigger = (
    <>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <GlobeIcon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-slate-900">
        {locale.toUpperCase()}
      </span>
      <ChevronDownIcon
        className={`h-4 w-4 text-slate-400 transition ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </>
  );

  return (
    <HeaderDropdown
      containerRef={containerRef}
      isOpen={isOpen}
      onToggle={() => setIsOpen((current) => !current)}
      buttonClassName={triggerClassName}
      buttonContent={trigger}
      panelClassName="min-w-52"
    >
      <div className="border-b border-slate-100 px-3 py-2.5">
        <p className="text-sm font-semibold text-slate-900">{language.label}</p>
        <p className="text-xs text-slate-500">{language.options[locale]}</p>
      </div>
      <div className="flex flex-col py-1.5">
        {availableLocales.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleSelect(value)}
            className={`cursor-pointer rounded-xl px-3 py-2 text-left text-sm transition ${
              locale === value
                ? "bg-slate-100 font-medium text-slate-900"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="font-medium">{value.toUpperCase()}</span>
            <span className="ml-2 text-slate-400">
              {language.options[value]}
            </span>
          </button>
        ))}
      </div>
    </HeaderDropdown>
  );
}
