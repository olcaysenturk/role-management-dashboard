import type { Metadata } from "next";
import { AppFooter, AppHeader } from "@/components/layout";
import { geistMono, geistSans } from "@/lib/fonts";
import { StoreProvider } from "@/store/provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <Toaster position="bottom-right" richColors expand={true} />
        <StoreProvider>
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
