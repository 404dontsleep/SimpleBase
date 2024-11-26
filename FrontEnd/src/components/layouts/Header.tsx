import { theme } from "antd";
import Logo from "../elements/Logo";
import View from "./View";
export default function Header({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const {
    token: { colorPrimary, colorBgBase, borderRadius },
  } = theme.useToken();
  return (
    <View
      style={{
        flexDirection: "row",
        padding: "1rem",
        backgroundColor: colorBgBase,
        margin: 10,
        borderRadius: borderRadius,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        ...style,
      }}
    >
      <Logo style={{ color: colorPrimary }} />
      {children}
    </View>
  );
}
