type RouterMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "USE";
interface RouterType {
  _id: string;
  path: string;
  method: RouterMethod;
  permission: string;
}

export default RouterType;
