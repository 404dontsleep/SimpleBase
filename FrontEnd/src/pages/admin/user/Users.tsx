import View from "@/components/layouts/View";
import useUserStore from "@/stores/User.store";
import UserType from "@MyTypes/user.type";
import { App, Button, Card, Input, Table, TableColumnsType, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
export default function Users() {
  const { GetUsers, users, UpdateUser } = useUserStore();
  const [search, setSearch] = useState("");
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const data = users
    .filter((u) => search === "" || u.email.includes(search))
    .map((u) => ({ ...u, key: u._id }));
  const handleUpdate = (user: UserType, isVerified: boolean) => {
    if (isVerified) user.verified = !user.verified;
    else user.blocked = !user.blocked;
    UpdateUser(user)
      .then(() => notification.success({ message: "Success" }))
      .catch((error) =>
        notification.error({
          message: error?.response?.data?.message || "Failed",
        })
      );
  };
  const handleAdd = () => {
    navigate("/admin/user/new");
  };
  const handleEdit = (id: string) => {
    navigate(`/admin/user/${id}`);
  };
  const columns: TableColumnsType<UserType> = [
    {
      title: "Action",
      key: "action",
      width: 1,
      render(_value, record) {
        return (
          <View style={{ gap: 10, flexDirection: "row" }}>
            <Button
              size='middle'
              type='primary'
              shape='circle'
              icon={<EditOutlined />}
              onClick={() => handleEdit(record._id)}
            />
          </View>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render(value, user) {
        return (
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdate(user, true)}
            color={value ? "green" : "red"}
          >
            {value ? "Verified" : "Not Verified"}
          </Tag>
        );
      },
    },
    {
      title: "Blocked",
      dataIndex: "blocked",
      key: "blocked",
      render(value, user) {
        return (
          <Tag
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdate(user, false)}
            color={value ? "red" : "green"}
          >
            {value ? "Blocked" : "Active"}
          </Tag>
        );
      },
    },
  ];
  useEffect(() => {
    GetUsers();
  }, [GetUsers]);
  return (
    <View style={{ flex: 1, marginLeft: 10, gap: 10 }}>
      <Card
        style={{
          flex: 1,
          overflowX: "auto",
          overflowY: "auto",
        }}
        title='Users Management'
        extra={
          <Button
            type='primary'
            shape='round'
            onClick={handleAdd}
            icon={<UserAddOutlined />}
          >
            New
          </Button>
        }
      >
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
          style={{ marginBottom: 10 }}
        />
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </View>
  );
}
