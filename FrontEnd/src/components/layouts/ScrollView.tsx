import View from "./View";

export default function ScrollView({
  horizontal,
  style,
  children,
}: {
  horizontal?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#00000055 #00000000",
        ...style,
        ...(horizontal ? { overflowX: "auto" } : { overflowY: "auto" }),
      }}
    >
      {children}
    </View>
  );
}
