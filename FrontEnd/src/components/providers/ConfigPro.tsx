import useThemeStore from "@/stores/Theme.store";
import { ConfigProvider, theme } from "antd";

export default function ConfigPro({
  children,
}: {
  children?: React.ReactNode;
}) {
  const {
    theme: { darkmode },
  } = useThemeStore();
  return (
    <ConfigProvider
      componentSize='large'
      theme={{
        algorithm: darkmode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#00B96B",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
