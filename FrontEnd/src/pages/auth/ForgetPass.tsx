import View from "@/components/layouts/View";
import { App, Button, Card, Input } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import useAuthStore from "@/stores/Auth.store";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function ForgetPass() {
  const { SendOTP } = useAuthStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const handleVerify = () => {
    setLoading(true);
    SendOTP(email)
      .then(() => {
        notification.success({ message: "Check your email" });
        navigate("/reset-password");
      })
      .catch((error) => {
        if (error.response.data.message) {
          notification.error({ message: error.response.data.message });
        } else notification.error({ message: "Failed" + error });
      })
      .finally(() => setLoading(false));
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Card style={{ minWidth: 400 }}>
        <Card.Meta
          title='Reset Password'
          description={`Please enter your email address to reset your password.`}
        />
        <View style={{ marginTop: 20, gap: 8 }}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            prefix={<CodeOutlined />}
          />
          <Button
            loading={loading}
            disabled={!email}
            onClick={handleVerify}
            type='primary'
          >
            Reset Password
          </Button>
        </View>
      </Card>
    </View>
  );
}
