import { CodeOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";
export default function Logo({ style }: { style?: React.CSSProperties }) {
  return (
    <NavLink to='/'>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: "bold",
          ...style,
        }}
      >
        <CodeOutlined style={{ marginRight: "0.5rem" }} />
        Logo
      </div>
    </NavLink>
  );
}
