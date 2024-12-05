import UserType from "@MyTypes/user.type";
import { create } from "zustand";
import AxiosInstance from "./AxiosInstance";

interface IUserStore {
  users: UserType[];
  GetUsers: () => Promise<UserType[]>;
  FindUsers: ({
    limit,
    page,
    email,
    verified,
    blocked,
  }: {
    limit?: number;
    page?: number;
    email?: UserType["email"];
    verified?: UserType["verified"];
    blocked?: UserType["blocked"];
  }) => Promise<UserType[]>;
  GetUser: (_id: string) => Promise<UserType>;
  AddUser: (user: Pick<UserType, "email" | "password">) => Promise<UserType>;
  UpdateUser: (
    user: Pick<
      UserType,
      "_id" | "password" | "permission" | "blocked" | "verified"
    >
  ) => Promise<UserType>;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  users: [],
  GetUsers: async () => {
    const { data } = await AxiosInstance.post("/admin/user/findAll", {});
    set({ users: data.users });
    return data.users;
  },
  FindUsers: async ({ limit, page, email, verified, blocked }) => {
    const { data } = await AxiosInstance.post("/admin/user/find", {
      limit,
      page,
      email,
      verified,
      blocked,
    });
    return data.users;
  },
  GetUser: async (_id) => {
    const { data } = await AxiosInstance.post(`/admin/user/findOne`, {
      _id,
    });
    return data.user;
  },
  AddUser: async (user) => {
    const { data } = await AxiosInstance.post("/admin/user/create", user);
    set({ users: [...get().users, data.user] });
    return data.user;
  },
  UpdateUser: async (user) => {
    const { data } = await AxiosInstance.post(`/admin/user/update`, user);
    set({
      users: get().users.map((u) => (u._id === data.user._id ? data.user : u)),
    });
    return data.user;
  },
}));

export default useUserStore;
