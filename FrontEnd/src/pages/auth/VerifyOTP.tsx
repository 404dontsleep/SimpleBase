import View from "@/components/layouts/View";
import { App, Button, Card, Input } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import useAuthStore from "@/stores/Auth.store";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
export default function VerifyOTP() {
  const { user, Verify, SendOTP: ResendOTP } = useAuthStore();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next");
  const handleVerify = () => {
    Verify(code)
      .then(() => {
        notification.success({ message: "Verify success" });

        if (next) navigate(next);
        else navigate("/login");
      })
      .catch((error) => {
        if (error.response.data.message) {
          notification.error({ message: error.response.data.message });
        } else notification.error({ message: "Verify failed" + error });
      });
  };
  const handleResendOTP = () => {
    setLoading(true);
    ResendOTP()
      .then(() => {
        notification.success({ message: "Resend OTP success" });
      })
      .catch((error) => {
        if (error.response.data.message) {
          notification.error({ message: error.response.data.message });
        } else notification.error({ message: "Resend OTP failed" + error });
      })
      .finally(() => setLoading(false));
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Card style={{ minWidth: 400 }}>
        <Card.Meta
          title='Verify your email'
          description={`We've sent an OTP to ${user?.email}`}
        />
        <View style={{ marginTop: 20, gap: 8 }}>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='OTP'
            prefix={<CodeOutlined />}
          />
          <Button onClick={handleVerify} type='primary'>
            Verify
          </Button>
          <Button loading={loading} onClick={handleResendOTP}>
            Resend OTP
          </Button>
        </View>
      </Card>
    </View>
  );
}
