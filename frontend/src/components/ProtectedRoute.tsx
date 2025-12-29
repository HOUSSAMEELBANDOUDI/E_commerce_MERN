import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

function ProtectedRoute() {
  const { token } = useAuth();

  // لو مش عامل login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // لو عامل login
  return <Outlet />;
}

export default ProtectedRoute;
