import { isDarkAtom } from "./atom";
import { useRecoilState } from "recoil";

export const useTheme = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const toggleTheme = () => {
    const next = !isDark;
    localStorage.setItem("isDark", String(next)); // 저장
    setIsDark(next);
  };

  return { isDark, toggleTheme };
};
