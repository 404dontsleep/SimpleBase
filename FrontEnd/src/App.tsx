import { Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Register from "./pages/auth/Register";
import useAuthStore from "./stores/Auth.store";
import { useEffect } from "react";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgetPass from "./pages/auth/ForgetPass";
import ResetPass from "./pages/auth/ResetPass";
import AdminLayout from "./pages/admin/AdminLayout";
import Users from "./pages/admin/user/Users";
import Permissions from "./pages/admin/permission/Permissions";
import NewUser from "./pages/admin/user/NewUser";
import EditUser from "./pages/admin/user/EditUser";
import NewPermission from "./pages/admin/permission/NewPermission";
import EditPermission from "./pages/admin/permission/EditPermission";
import Dashboard from "./pages/admin/dashboard/Dashboard";
export default function App() {
  const { GetUser } = useAuthStore();
  useEffect(() => {
    GetUser();
  }, [GetUser]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify' element={<VerifyOTP />} />
        <Route path='/forgot-password' element={<ForgetPass />} />
        <Route path='/reset-password' element={<ResetPass />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/user/new' element={<NewUser />} />
          <Route path='/admin/user/:_id' element={<EditUser />} />
          <Route path='/admin/permissions' element={<Permissions />} />
          <Route path='/admin/permission/new' element={<NewPermission />} />
          <Route path='/admin/permission/:_id' element={<EditPermission />} />
          <Route path='*' element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}
