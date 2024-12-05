import View from "@/components/layouts/View";
import useUserStore from "@/stores/User.store";
import { App, Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router";

export default function NewUser() {
  const { AddUser } = useUserStore();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const handleSubmit = (e: { email: string; password: string }) => {
    AddUser({
      email: e.email,
      password: e.password,
    })
      .then((user) => {
        notification.success({ message: "Add user success" });
        navigate("/admin/users/" + user._id);
      })
      .catch((error) => {
        notification.error({
          message: error?.response?.data?.message || error,
        });
      });
  };
  return (
    <View style={{ flex: 1, marginLeft: 10, gap: 10 }}>
      <Card
        style={{ flex: 1 }}
        title='New User'
        extra={<Button shape='round'>Go Back</Button>}
      >
        <Form onFinish={handleSubmit}>
          <View
            style={{
              gap: 10,
            }}
          >
            <Form.Item
              name='email'
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please input valid email!",
                },
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
                {
                  max: 20,
                  message: "Password must be at most 20 characters",
                },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
            <Button type='primary' shape='round' htmlType='submit'>
              Submit
            </Button>
          </View>
        </Form>
      </Card>
    </View>
  );
}
