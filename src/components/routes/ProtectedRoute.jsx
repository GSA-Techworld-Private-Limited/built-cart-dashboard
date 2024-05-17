import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import MyContext from "../context/MyContext";

function ProtectedRoute({ redirectPath = "/", children }) {
  const token = sessionStorage.getItem("refreshToken");
  const location = useLocation();
  const { authenticated } = useContext(MyContext);
  if (!token && !authenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children || <Outlet />;
}

export default ProtectedRoute;
