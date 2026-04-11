import type { Metadata } from "next";
import { AppFooter, AppHeader } from "@/components/layout";
import { geistMono, geistSans } from "@/lib/fonts";
import { StoreProvider } from "@/store/provider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { defaultLocale, messages, Locale } from "@/lib/i18n";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as Locale) || defaultLocale;
  const t = messages[locale].seo.global;
  const appName = process.env.NEXT_PUBLIC_APP_TITLE || "Role Management Dashboard";

  return {
    title: {
      default: t.title,
      template: `%s | ${appName}`,
    },
    description: t.description,
    keywords: t.keywords.split(", ").concat(["healthcare", "dashboard"]),
    authors: [{ name: appName }],
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: appName,
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as Locale) || defaultLocale;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <Toaster position="bottom-right" richColors expand={true} />
        <StoreProvider initialLocale={locale}>
          <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="mx-auto flex w-full max-w-6xl flex-1 px-6 py-10">
              {children}
            </main>
            <AppFooter />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
