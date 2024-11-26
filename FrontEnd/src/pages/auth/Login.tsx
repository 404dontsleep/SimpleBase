import { Button, Card, Divider, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Typography, App } from "antd";
import View from "../../components/layouts/View";
import { NavLink, useNavigate } from "react-router";
import useAuthStore from "@/stores/Auth.store";
const { Title } = Typography;
export default function Login() {
  const [form] = Form.useForm();
  const { Login, GetUser } = useAuthStore();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const onFinish = (values: { email: string; password: string }) => {
    Login(values.email, values.password)
      .then(() => {
        notification.success({ message: "Login success" });
        GetUser();
        navigate("/");
        if (localStorage.getItem("token")?.split(".")[1]) {
          const payload = JSON.parse(
            atob(localStorage.getItem("token")?.split(".")[1] || "{}")
          );
          if (payload.verify) navigate("/verify?next=/");
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          notification.error({ message: error.response.data.message });
        } else notification.error({ message: "Login failed" + error });
      });
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ minWidth: 400 }}>
        <Form
          form={form}
          name='horizontal_login'
          onFinish={onFinish}
          style={{ width: 400 }}
        >
          <Title>Log in</Title>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: "Email is required" },
              {
                validator(_, value) {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return Promise.reject("Invalid email address");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: "100%" }}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
          <Divider>or</Divider>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <NavLink to='/register' style={{ flex: 1 }}>
              <Button style={{ width: "100%" }}>Register</Button>
            </NavLink>
            <NavLink to='/forgot-password' style={{ flex: 1 }}>
              <Button danger style={{ width: "100%" }}>
                Forgot password
              </Button>
            </NavLink>
          </View>
        </Form>
      </Card>
    </View>
  );
}
