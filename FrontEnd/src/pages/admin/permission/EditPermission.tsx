import View from "@/components/layouts/View";
import usePermissionStore from "@/stores/Permission.store";
import PermissionType from "@MyTypes/permission.type";
import {
  App,
  Button,
  Card,
  ColorPicker,
  Divider,
  Input,
  Skeleton,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PermissionSelect } from "../user/EditUser";

export default function EditPermission() {
  const { permission, GetPermission, UpdatePermission } = usePermissionStore();
  const { _id } = useParams();
  const [form, setForm] = useState<PermissionType>();
  const { notification } = App.useApp();
  const handleSubmit = () => {
    if (!form) return;
    UpdatePermission(form)
      .then(() => {
        notification.success({ message: "Update permission success" });
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          notification.error({ message: error.response.data.message });
        } else notification.error({ message: "Failed " + error });
      });
  };
  const handleChange = <K extends keyof PermissionType>(
    key: K,
    value: PermissionType[K]
  ) => {
    if (!form) return;
    setForm({ ...form, [key]: value });
  };
  useEffect(() => {
    if (permission.length === 0) GetPermission();
  }, [GetPermission, permission.length]);
  useEffect(() => {
    if (_id) setForm(permission.find((p) => p._id === _id));
  }, [_id, permission]);
  return (
    <FCard>
      {form ? (
        <View style={{ gap: 10 }}>
          <View>
            <Typography.Text strong>ID: {_id}</Typography.Text>
          </View>
          <Divider />
          <Input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder='Name'
          />
          <Input
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder='Description'
          />
          <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
            <Typography.Text strong>Color: </Typography.Text>
            <ColorPicker
              value={form.config?.color}
              onChange={(color) =>
                handleChange("config", { color: color.toHexString() })
              }
            />
          </View>
          <Divider />
          <PermissionSelect
            values={form.children}
            onChange={(values) => handleChange("children", values)}
          />
          <Button type='primary' onClick={handleSubmit}>
            Update
          </Button>
        </View>
      ) : (
        <Skeleton />
      )}
    </FCard>
  );
}

function FCard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <View style={{ flex: 1, marginLeft: 10, gap: 10 }}>
      <Card
        style={{ flex: 1 }}
        title='Edit Permission'
        extra={
          <Button shape='round' onClick={() => navigate(`/admin/permissions`)}>
            Go Back
          </Button>
        }
      >
        {children}
      </Card>
    </View>
  );
}
