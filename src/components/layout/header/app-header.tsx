"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/language";
import { LanguageSwitch } from "@/components/layout/header/language-switch";
import { Logo } from "@/components/layout/header/logo";
import { ProfileInfo } from "@/components/layout/header/profile-info";
import { MobileMenu } from "@/components/layout/header/mobile-menu";
import { MenuIcon } from "@/components/icons";

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { messages } = useLanguage();
  const t = messages.header.mobileMenu;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitch />
          <ProfileInfo />
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label={t.openAria}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
