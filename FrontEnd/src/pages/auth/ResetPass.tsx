import View from "@/components/layouts/View";
import { App, Button, Card, Input } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import useAuthStore from "@/stores/Auth.store";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function ResetPass() {
  const { ResetPassword, GetUser } = useAuthStore();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const handleResetPass = () => {
    if (newPassword !== confirmPassword) {
      notification.error({ message: "Password not match" });
      return;
    }
    setLoading(true);
    ResetPassword(code, newPassword)
      .then(() => {
        notification.success({ message: "Reset password success" });
        GetUser();
        navigate("/");
      })
      .catch((error) => {
        if (error.response.data.message) {
          notification.error({ message: error.response.data.message });
        } else notification.error({ message: "Failed" + error });
      })
      .finally(() => setLoading(false));
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
        <Card.Meta
          title='Reset Password'
          description={`Verify code and reset your password.`}
        />
        <View style={{ marginTop: 20, gap: 8 }}>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='Code'
            prefix={<CodeOutlined />}
          />
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='New Password'
            type='password'
          />
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            type='password'
          />
          <Button
            loading={loading}
            disabled={!newPassword}
            onClick={handleResetPass}
            type='primary'
          >
            Reset Password
          </Button>
        </View>
      </Card>
    </View>
  );
}
