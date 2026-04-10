"use client";

import Link from "next/link";
import { MenuItem } from "@headlessui/react";
import { ChevronDownIcon, UserIcon } from "@/components/icons";
import { HeaderDropdown } from "@/components/ui/header-dropdown/header-dropdown";
import { useLanguage } from "@/hooks/language/use-language";

const triggerClassName =
  "flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:border-slate-300 focus:bg-slate-50 focus:outline-none";

export function ProfileInfo() {
  const { messages } = useLanguage();
  const { name, description, menu } = messages.header.profile;

  const trigger = (
    <>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <UserIcon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-slate-900">{menu.account}</span>
      <ChevronDownIcon className="h-4 w-4 text-slate-400" />
    </>
  );

  return (
    <HeaderDropdown
      buttonClassName={triggerClassName}
      buttonContent={trigger}
      panelClassName="min-w-60"
    >
      <div className="border-b border-slate-100 px-3 py-2.5">
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <div className="flex flex-col py-1.5 gap-0.5">
        <MenuItem>
          <Link
            href="/account"
            className="cursor-pointer block rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            {menu.account}
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href="/preferences"
            className="cursor-pointer block rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            {menu.preferences}
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            type="button"
            className="cursor-pointer w-full rounded-xl px-3 py-2 text-left text-sm text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            {menu.signOut}
          </button>
        </MenuItem>
      </div>
    </HeaderDropdown>
  );
}
