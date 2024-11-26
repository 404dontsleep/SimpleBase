export default function View({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        alignItems: "stretch",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        listStyle: "none",
        margin: 0,
        minWidth: 0,
        minHeight: 0,
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
