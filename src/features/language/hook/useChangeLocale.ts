"use client";

import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { useLocale } from "next-intl";

export function useChangeLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const changeLocale = (nextLocale: string) => {
    if (nextLocale === locale) return;

    router.replace(pathname, {
      locale: nextLocale,
    });
  };

  return { locale, changeLocale };
}
