import {
  availableLocales,
  defaultLocale,
  localeStorageKey,
  type Locale,
} from "./config";
import { en } from "./locales/en";
import { tr } from "./locales/tr";
import type { LanguageMessages } from "../../types/i18n";

export const messages: Record<Locale, LanguageMessages> = {
  tr,
  en,
};

export type Messages = (typeof messages)[Locale];
export type { Locale } from "./config";

export { availableLocales, defaultLocale, localeStorageKey };
