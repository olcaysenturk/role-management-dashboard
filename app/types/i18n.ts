import type { Locale } from "../lib/i18n/config";

export type HeaderMessages = {
  language: {
    label: string;
    options: Record<Locale, string>;
  };
  logo: {
    primary: string;
    secondary: string;
  };
  profile: {
    name: string;
    description: string;
    menu: {
      account: string;
      preferences: string;
      signOut: string;
    };
  };
};

export type FooterMessages = {
  brand: string;
  copyright: string;
};

export type HomeMessages = {
  title: string;
};

export type LanguageMessages = {
  header: HeaderMessages;
  footer: FooterMessages;
  home: HomeMessages;
};
