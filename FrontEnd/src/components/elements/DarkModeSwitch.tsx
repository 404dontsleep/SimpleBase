import useThemeStore from "@/stores/Theme.store";
import { Switch } from "antd";

export default function DarkModeSwitch() {
  const { theme, UpdateValue } = useThemeStore();
  return (
    <Switch
      value={theme.darkmode}
      onChange={(checked) => UpdateValue("darkmode", checked)}
    />
  );
}
