import { configureStore } from "@reduxjs/toolkit";
import { languageReducer } from "@/store/language";
import { usersReducer } from "@/store/users";

export function makeStore() {
  return configureStore({
    reducer: {
      language: languageReducer,
      users: usersReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

