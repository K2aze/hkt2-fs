import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { loadAllMessages } from "./loadAllMessages";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const messages = loadAllMessages(locale);
  console.log(Object.keys(messages));
  return {
    locale,
    messages: loadAllMessages(locale),
  };
});
