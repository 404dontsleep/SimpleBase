import { Outlet, useNavigate } from "react-router";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import useAuthStore from "@/stores/Auth.store";
import View from "@/components/layouts/View";
import { Button } from "antd";
export default function Layout() {
  const { user, Logout } = useAuthStore.getState();
  const navigate = useNavigate();
  const handleLogout = () => {
    Logout().then(() => {
      navigate("/login");
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 255, 255, 0.0)",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          {user ? (
            <>
              <Button type='primary' shape='round' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button shape='round' onClick={() => navigate("/register")}>
                Register
              </Button>
              <Button
                type='primary'
                shape='round'
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </>
          )}
        </View>
      </Header>
      <Outlet />
      <Footer></Footer>
    </View>
  );
}
