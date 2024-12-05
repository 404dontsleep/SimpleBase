import View from "@/components/layouts/View";
import { Layout, Menu, MenuProps, theme } from "antd";
import { AppstoreOutlined, FileProtectOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router";
export default function AdminLayout() {
  const {
    token: { borderRadius, colorBgBase },
  } = theme.useToken();
  return (
    <View
      style={{
        flex: 1,
        // background: colorBgBase,
        marginLeft: 10,
        marginRight: 10,
        // backdropFilter: "blur(10px)",
        // boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        borderRadius: borderRadius,
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <Layout.Sider
        collapsedWidth={64}
        breakpoint='md'
        style={{
          flex: 1,
          background: colorBgBase,
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#00000055 #00000000",
          // boxShadow: "1px 0px 1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MyMenu />
      </Layout.Sider>
      <View
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Outlet />
      </View>
    </View>
  );
}
type MenuItem = Required<MenuProps>["items"][number];
const BASE_PATH = "/admin";
function MyMenu() {
  const items: MenuItem[] = [
    {
      key: "/",
      label: "Dashboard",
      icon: <AppstoreOutlined />,
    },
    {
      key: "/permissions",
      label: "Permissions",
      icon: <FileProtectOutlined />,
    },
    {
      key: "/users",
      label: "Users",
      icon: <FileProtectOutlined />,
    },
  ];
  const navigate = useNavigate();
  const hanleClick = (item: MenuItem) => {
    if (item?.key) navigate(`${BASE_PATH}${item.key}`);
  };
  return (
    <Menu
      items={items}
      onSelect={hanleClick}
      defaultValue={"/permissions/users"}
      mode='vertical'
    />
  );
}
