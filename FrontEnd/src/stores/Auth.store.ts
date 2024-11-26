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
  ResendOTP: () => Promise<void>;
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
  ResendOTP: async () => {
    await AxiosInstance.get("/auth/resend");
  },
}));

export default useAuthStore;
