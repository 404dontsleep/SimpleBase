import View from "@/components/layouts/View";
import usePermissionStore from "@/stores/Permission.store";
import { Button, Card, Table, TableProps } from "antd";
import { useEffect } from "react";
import { EditOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
export default function Permissions() {
  const { permission, GetPermission } = usePermissionStore();
  const navigate = useNavigate();
  const data = permission
    // .filter((p) => p.editable)
    .map((p) => ({ ...p, key: p._id }));
  const handleEdit = (id: string) => {
    navigate(`/admin/permission/${id}`);
  };
  const handleAdd = () => {
    navigate(`/admin/permission/new`);
  };
  const columns: TableProps["columns"] = [
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render(_value, record) {
        return (
          <Card.Meta title={record.name} description={record.description} />
        );
      },
    },
  ];
  useEffect(() => {
    GetPermission();
  }, [GetPermission]);
  return (
    <View style={{ flex: 1, marginLeft: 10, gap: 10 }}>
      <Card
        styles={{
          body: {
            flex: 1,
          },
        }}
        style={{
          display: "flex",
          flexDirection: "column",

          flex: 1,
          overflowX: "auto",
          overflowY: "auto",
        }}
        title='Permission Management'
        extra={
          <Button
            type='primary'
            shape='round'
            icon={<UsergroupAddOutlined />}
            onClick={handleAdd}
          >
            Add
          </Button>
        }
      >
        <Table
          expandable={{ childrenColumnName: "chialdren" }}
          columns={columns}
          dataSource={data}
        />
      </Card>
    </View>
  );
}
