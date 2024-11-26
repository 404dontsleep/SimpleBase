import { theme } from "antd";
import View from "./View";

export default function Footer({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const {
    token: { colorBgBase, borderRadius },
  } = theme.useToken();
  return (
    <View
      style={{
        backgroundColor: colorBgBase,
        margin: 10,
        padding: "1rem",
        borderRadius: borderRadius,
        alignItems: "center",
        minHeight: "4rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        ...style,
      }}
    >
      {children}
    </View>
  );
}
