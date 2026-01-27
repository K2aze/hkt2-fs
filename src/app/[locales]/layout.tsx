import type { ReactNode } from "react";
import { Noto_Sans_JP } from "next/font/google";
import "@/styles/main.css";
import "@/styles/main.scss";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/providers/AuthContext";
const notoFont = Noto_Sans_JP({
  display: "swap",
  subsets: ["vietnamese", "latin-ext", "latin"],
  variable: "--noto-font",
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={notoFont.variable}>
      <body>
        <AuthProvider>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
