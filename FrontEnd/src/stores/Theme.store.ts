import { create } from "zustand";

interface IThemeConfig {
  darkmode: boolean;
}
interface IThemeStore {
  theme: IThemeConfig;
  UpdateValue: <K extends keyof IThemeConfig>(
    key: K,
    value: IThemeConfig[K]
  ) => void;
}
const defaultTheme: IThemeConfig = { darkmode: false };
if (localStorage.getItem("_theme")) {
  defaultTheme.darkmode = JSON.parse(localStorage.getItem("_theme")!);
}
const useThemeStore = create<IThemeStore>((set) => ({
  theme: defaultTheme,
  UpdateValue: (key, value) => {
    set((state) => ({ theme: { ...state.theme, [key]: value } }));
    localStorage.setItem("_theme", JSON.stringify(value));
  },
}));

export default useThemeStore;
