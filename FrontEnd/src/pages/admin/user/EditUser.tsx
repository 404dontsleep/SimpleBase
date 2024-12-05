import View from "@/components/layouts/View";
import usePermissionStore from "@/stores/Permission.store";
import useUserStore from "@/stores/User.store";
import PermissionType from "@MyTypes/permission.type";
import UserType from "@MyTypes/user.type";
import {
  App,
  Button,
  Card,
  Checkbox,
  Divider,
  Empty,
  Select,
  SelectProps,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditUser() {
  const [user, setUser] = useState<UserType>();
  const { GetUser, UpdateUser } = useUserStore();
  const { _id } = useParams();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const handleFinish = () => {
    if (!user) return;
    UpdateUser(user)
      .then(() => notification.success({ message: "Success" }))
      .catch((error) =>
        notification.error({
          message: error?.response?.data?.message || "Failed",
        })
      );
  };
  const handleChange = <K extends keyof UserType>(
    key: K,
    value: UserType[K]
  ) => {
    if (!user) return;
    setUser({ ...user, [key]: value });
  };
  const handleGoBack = () => {
    navigate("/admin/users");
  };
  useEffect(() => {
    if (!_id) return;
    GetUser(_id)
      .then((user) => setUser(user))
      .catch(() => {
        notification.error({ message: "User not found" });
        navigate("/admin/users");
      });
  }, [GetUser, _id, notification, navigate]);
  if (!user) return <Empty />;
  return (
    <View style={{ flex: 1, marginLeft: 10, gap: 10 }}>
      <Card
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyItems: "stretch",
        }}
        title='Edit User'
        extra={
          <Button shape='round' onClick={handleGoBack}>
            Go Back
          </Button>
        }
      >
        <View>
          <Typography.Text strong>User ID: {_id}</Typography.Text>
        </View>
        <View>
          <Typography.Text>Email: {user.email}</Typography.Text>
        </View>
        <Divider />
        <Checkbox
          onChange={(e) => handleChange("blocked", e.target.checked)}
          checked={user.blocked}
        >
          Blocked
        </Checkbox>
        <br />
        <Checkbox
          onChange={(e) => handleChange("verified", e.target.checked)}
          checked={user.verified}
        >
          Verified
        </Checkbox>
        <Divider />

        <PermissionSelect
          values={user.permission}
          onChange={(values) => handleChange("permission", values)}
        />
        <Divider />
        <Button
          style={{ width: "100%" }}
          type='primary'
          shape='round'
          onClick={handleFinish}
        >
          Update
        </Button>
      </Card>
    </View>
  );
}
const string2Config = (find?: PermissionType) => {
  if (!find) return { color: "gray" };
  if (find.config) return find.config;
  if (find.name === "root") return { color: "red" };
  if (find.name === "default") return { color: "blue" };
  if (find.name.match(/\[get|GET\]/)) return { color: "green" };
  if (find.name.match(/\[post|POST|put|PUT|delete|DELETE|use|USE\]/))
    return { color: "red" };
  return { color: "" };
};

export function PermissionSelect({
  values,
  onChange,
}: {
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const { permission, GetPermission } = usePermissionStore();
  const [showAll, setShowAll] = useState(true);
  const items: SelectProps["options"] = [
    ...permission
      .filter((p) => showAll || p.editable)
      .sort((a, b) =>
        b.name
          .replace(/\[.+\] /, "")
          .localeCompare(a.name.replace(/\[.+\] /, ""))
      )
      .map((p) => ({ label: p.name, value: p._id })),
  ];
  const TagRender: SelectProps["tagRender"] = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const find = permission.find((p) => p._id === value);
    const config = string2Config(find);
    return (
      <Tag
        color={config.color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };
  useEffect(() => {
    GetPermission();
  }, [GetPermission]);
  return (
    <View style={{ gap: 10 }}>
      <Typography.Text strong>Permissions</Typography.Text>
      <Checkbox
        onChange={(e) => setShowAll(e.target.checked)}
        checked={showAll}
      >
        Show all
      </Checkbox>
      <Select
        size='middle'
        filterOption={(input, option) =>
          (option?.label + "").toLowerCase().includes(input)
        }
        tagRender={TagRender}
        style={{ width: "100%" }}
        mode='multiple'
        options={items}
        value={values}
        onChange={onChange}
      />
    </View>
  );
}
