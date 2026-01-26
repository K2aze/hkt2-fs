import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ja", "vi", "ko", "my"],

  // Used when no locale matches
  localeDetection: true,
  defaultLocale: "en",
});
