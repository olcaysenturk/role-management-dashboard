import { LanguageSwitch } from "@/components/layout/header/language-switch";
import { Logo } from "@/components/layout/header/logo";
import { ProfileInfo } from "@/components/layout/header/profile-info";

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <ProfileInfo />
        </div>
      </div>
    </header>
  );
}
