import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/auth_context";

export default function ProtectedRoutes() {
  const { cookies } = useAuth();
  console.log("protected route");
  return cookies.token ? <Outlet /> : <h1>You are not Authorized to view</h1>;
}
