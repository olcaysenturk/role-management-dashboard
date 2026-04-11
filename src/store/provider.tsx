"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { defaultLocale, localeStorageKey, isValidLocale, type Locale } from "@/lib/i18n/config";
import { setLocale } from "@/store/language";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { makeStore } from "@/store/index";

function LanguagePersistence({ onHydrated }: { onHydrated: () => void }) {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.language.locale);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(localeStorageKey);
    if (isValidLocale(savedLocale)) {
      dispatch(setLocale(savedLocale));
    }
    onHydrated();
  }, [dispatch, onHydrated]);

  useEffect(() => {
    const activeLocale = locale || defaultLocale;
    window.localStorage.setItem(localeStorageKey, activeLocale);
    document.documentElement.lang = activeLocale;
  }, [locale]);

  return null;
}

export function StoreProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [store] = useState(() => 
    makeStore(initialLocale ? { language: { locale: initialLocale } } : undefined)
  );
  const [isHydrated, setIsHydrated] = useState(false);

  return (
    <Provider store={store}>
      <LanguagePersistence onHydrated={() => setIsHydrated(true)} />
      {children}
    </Provider>
  );
}
