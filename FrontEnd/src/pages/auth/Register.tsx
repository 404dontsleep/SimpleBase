import { App, Button, Card, Divider, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import View from "../../components/layouts/View";
import { NavLink, useNavigate } from "react-router";
import useAuthStore from "@/stores/Auth.store";
const { Title } = Typography;
export default function Register() {
  const [form] = Form.useForm();
  const { Register } = useAuthStore();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const onFinish = (values: { email: string; password: string }) => {
    Register(values.email, values.password)
      .then(() => {
        notification.success({ message: "Register success" });
        navigate("/verify");
      })
      .catch((error) => {
        if (error.response.data.message) {
          notification.error({ message: error.response.data.message });
        } else notification.error({ message: "Register failed" + error });
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
      <Card>
        <Form
          form={form}
          name='horizontal_login'
          onFinish={onFinish}
          style={{ width: 400 }}
        >
          <Title>Register</Title>
          <Form.Item
            name='email'
            rules={[{ required: true, message: "Email is required" }]}
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
          <Form.Item
            name='confirm'
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Confirm Password'
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
                Register
              </Button>
            )}
          </Form.Item>
          <Divider>or</Divider>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <NavLink to='/login' style={{ flex: 1 }}>
              <Button style={{ width: "100%" }}>Login</Button>
            </NavLink>
          </View>
        </Form>
      </Card>
    </View>
  );
}
