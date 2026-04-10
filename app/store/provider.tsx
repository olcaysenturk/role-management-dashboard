"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { defaultLocale, localeStorageKey, isValidLocale } from "../lib/i18n/config";
import { setLocale } from "./language";
import { useAppDispatch, useAppSelector } from "./hooks";
import { makeStore } from "./index";

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

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);
  const [isHydrated, setIsHydrated] = useState(false);

  return (
    <Provider store={store}>
      <LanguagePersistence onHydrated={() => setIsHydrated(true)} />
      {isHydrated ? children : <div className="invisible">{children}</div>}
    </Provider>
  );
}
