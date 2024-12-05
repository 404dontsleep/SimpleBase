import View from "@/components/layouts/View";
import usePermissionStore from "@/stores/Permission.store";
import { App, Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router";

export default function NewPermission() {
  const { AddPermission } = usePermissionStore();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const handleSubmit = (e: { name: string }) => {
    AddPermission({
      name: e.name,
    })
      .then((e) => {
        notification.success({ message: "Add permission success" });
        navigate(`/admin/permission/${e._id}`);
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          notification.error({ message: error.response.data.message });
        } else notification.error({ message: "Failed" + error });
      });
  };
  return (
    <View style={{ flex: 1, marginLeft: 10, gap: 10 }}>
      <Card
        style={{ flex: 1 }}
        title='New Permission'
        extra={<Button shape='round'>Go Back</Button>}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name='name'>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%" }} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </View>
  );
}
