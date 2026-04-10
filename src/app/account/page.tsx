import { Metadata } from "next";
import { cookies } from "next/headers";
import { defaultLocale, messages, Locale } from "@/lib/i18n";
import AccountView from "./account-view";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as Locale) || defaultLocale;
  const t = messages[locale].seo.account;

  return {
    title: t.title,
    description: t.description,
  };
}

export default function AccountPage() {
  return <AccountView />;
}
