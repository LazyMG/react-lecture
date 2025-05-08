import { atom } from "recoil";

const getInitialTheme = (): boolean => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isDark") === "true";
  }
  return false;
};

export const isDarkAtom = atom<boolean>({
  key: "isDark",
  default: getInitialTheme(),
});
