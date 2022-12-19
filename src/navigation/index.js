import { useLocation, useRoutes } from "react-router-dom";
import useAuth from "../context/auth/useAuth";
import getRoutes from "./routes";

const RouterConfig = () => {
  const location = useLocation();
  const requestedPath = location.pathname;
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return useRoutes(getRoutes(isAuthenticated, requestedPath));
};

export default RouterConfig;
