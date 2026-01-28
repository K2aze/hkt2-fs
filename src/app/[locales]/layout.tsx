import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/styles/main.css";
import "@/styles/main.scss";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/providers/AuthContext";
import Header from "@/components/layouts/Header";
import { getLocale } from "next-intl/server";
const notoFont = Inter({
  display: "swap",
  subsets: ["vietnamese", "latin-ext", "latin"],
  variable: "--noto-font",
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={notoFont.variable}>
      <body>
        <AuthProvider>
          <NextIntlClientProvider>
            <Header />
            <main>{children}</main>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
