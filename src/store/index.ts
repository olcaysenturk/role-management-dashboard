import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { languageReducer } from "@/store/language";
import { usersReducer } from "@/store/users";

const rootReducer = combineReducers({
  language: languageReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

