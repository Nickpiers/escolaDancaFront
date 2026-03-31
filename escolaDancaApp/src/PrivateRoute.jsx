import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

export function PrivateRoute() {
  const { token } = useUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
