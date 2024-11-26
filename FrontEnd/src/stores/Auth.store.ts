import UserType from "@MyTypes/user.type";
import { create } from "zustand";
import AxiosInstance from "./AxiosInstance";
interface IAuthStore {
  user?: UserType;
  SetUser: (user: UserType) => void;
  Login: (email: string, password: string) => Promise<void>;
  Logout: () => Promise<void>;
  Register: (email: string, password: string) => Promise<void>;
  GetUser: () => Promise<void>;
  Verify: (code: string) => Promise<void>;
  SendOTP: (email?: string) => Promise<void>;
  ResetPassword: (code: string, password: string) => Promise<void>;
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: undefined,
  SetUser: (user: UserType) => set({ user }),
  Login: async (email: string, password: string) => {
    await AxiosInstance.post("/auth/login", {
      email,
      password,
    });
  },
  GetUser: async () => {
    const { data } = await AxiosInstance.get("/auth/me");
    if (data.user._id) set({ user: data.user });
  },
  Logout: async () => {
    localStorage.removeItem("token");
    set({ user: undefined });
  },
  Register: async (email: string, password: string) => {
    await AxiosInstance.post("/auth/register", {
      email,
      password,
    });
    await get().GetUser();
  },
  Verify: async (code: string) => {
    await AxiosInstance.post("/auth/verify", { code });
    await get().GetUser();
  },
  SendOTP: async (email?: string) => {
    await AxiosInstance.post("/auth/sendotp", { email });
  },
  ResetPassword: async (code: string, password: string) => {
    await AxiosInstance.post("/auth/reset", { code, password });
  },
}));

export default useAuthStore;
