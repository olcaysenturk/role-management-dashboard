"use client";

import { Fragment } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import Link from "next/link";
import { XIcon, GlobeIcon, UserIcon, ShieldIcon } from "@/components/icons";
import { useLanguage } from "@/hooks/language/use-language";
import { availableLocales } from "@/lib/i18n";

export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { messages, locale, setLocale } = useLanguage();
  const { name, description, menu } = messages.header.profile;
  const langOptions = messages.header.language.options;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full flex-col overflow-y-auto bg-white h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <span className="font-semibold text-slate-900">{messages.header.mobileMenu.title}</span>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                  aria-label={messages.header.mobileMenu.closeAria}
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {/* Profile section */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 truncate max-w-[200px]">{name}</h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <ShieldIcon className="h-3 w-3 text-blue-600" />
                      <span className="text-sm font-medium text-slate-500">{description}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 mb-8 border-b border-slate-100 pb-8">
                  <Link
                    href="/user-management"
                    onClick={onClose}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition flex items-center"
                  >
                    {messages.home.title}
                  </Link>
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition flex items-center"
                  >
                    {menu.account}
                  </Link>
                  <Link
                    href="/preferences"
                    onClick={onClose}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition flex items-center"
                  >
                    {menu.preferences}
                  </Link>
                </nav>

                {/* Language Switch */}
                <div className="mb-8 border-b border-slate-100 pb-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <GlobeIcon className="h-4 w-4" />
                    {messages.header.language.label}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {availableLocales.map((val) => (
                      <button
                        key={val}
                        onClick={() => {
                          setLocale(val);
                          onClose();
                        }}
                        className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                          locale === val
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100'
                        }`}
                      >
                        {langOptions[val]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-100"
                >
                  {menu.signOut}
                </button>
              </div>
            </Dialog.Panel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
