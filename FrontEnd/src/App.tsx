import { Route, Routes, useNavigate } from "react-router";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Register from "./pages/auth/Register";
import useAuthStore from "./stores/Auth.store";
import { useEffect } from "react";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgetPass from "./pages/auth/ForgetPass";
import ResetPass from "./pages/auth/ResetPass";
export default function App() {
  const { GetUser, user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    GetUser();
  }, [GetUser]);
  useEffect(() => {
    if (user?.verified === false) navigate("/verify");
  }, [navigate, user]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify' element={<VerifyOTP />} />
        <Route path='/forgot-password' element={<ForgetPass />} />
        <Route path='/reset-password' element={<ResetPass />} />
      </Route>
    </Routes>
  );
}
