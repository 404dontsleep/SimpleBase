import PermissionType from "@MyTypes/permission.type";
import { create } from "zustand";
import AxiosInstance from "./AxiosInstance";

interface IPermissionStore {
  permission: PermissionType[];
  GetPermission: () => Promise<PermissionType[]>;
  AddPermission: (
    permission: Pick<PermissionType, "name">
  ) => Promise<PermissionType>;
  DeletePermission: (_id: string) => Promise<PermissionType>;
  UpdatePermission: (
    permission: Pick<
      PermissionType,
      "_id" | "name" | "children" | "config" | "description"
    >
  ) => Promise<PermissionType>;
}

const usePermissionStore = create<IPermissionStore>((set, get) => ({
  permission: [],
  GetPermission: async () => {
    const { data } = await AxiosInstance.post("/admin/permission/findAll", {});
    set({ permission: data.permissions });
    return data.permissions;
  },
  AddPermission: async ({ name }) => {
    const { data } = await AxiosInstance.post("/admin/permission/create", {
      name,
    });
    set({ permission: [...get().permission, data.permission] });
    return data.permission;
  },
  DeletePermission: async (_id) => {
    const { data } = await AxiosInstance.post("/admin/permission/delete", {
      _id,
    });
    set({ permission: get().permission.filter((p) => p._id !== _id) });
    return data.permission;
  },
  UpdatePermission: async ({ _id, children, description, name, config }) => {
    const { data } = await AxiosInstance.post("/admin/permission/update", {
      _id,
      children,
      description,
      name,
      config,
    });
    set({
      permission: get().permission.map((p) =>
        p._id === data.permission._id ? data.permission : p
      ),
    });
    return data.permission;
  },
}));

export default usePermissionStore;
