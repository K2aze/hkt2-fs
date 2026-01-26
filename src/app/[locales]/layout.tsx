import type { ReactNode } from "react";
import { Noto_Sans_JP } from "next/font/google";
import "@/styles/main.css";
import "@/styles/main.scss";
import { LenisProvider } from "@/providers/lenis-provider";
import { NextIntlClientProvider } from "next-intl";
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
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
