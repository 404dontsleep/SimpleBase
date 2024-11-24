interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  permission: [string];
  verified: boolean;
  blocked: boolean;
}

export default UserType;
