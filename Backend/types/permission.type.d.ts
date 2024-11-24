interface PermissionType {
  _id: string;
  children: string[];
  name: string;
  description: string;
  editable: boolean;
  config?: {
    color: string;
  };
}

export default PermissionType;
