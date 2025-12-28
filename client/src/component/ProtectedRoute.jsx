import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // store role after login

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && role !== "admin") {
    return <Navigate to="/dashboard" />; // redirect non-admin users
  }

  return children;
};

export default ProtectedRoute;
