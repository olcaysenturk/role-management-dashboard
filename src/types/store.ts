import { User } from "@/types/user";
import { Locale } from "@/lib/i18n/config";

export interface UsersState {
  users: User[];
  isLoading: boolean;
}

export interface LanguageState {
  locale: Locale;
}


