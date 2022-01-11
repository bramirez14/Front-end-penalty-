import {  Navigate } from "react-router-dom";
import { isLogged } from "../auth/localStorage";
export const PublicRoute = ({ children }) => {
  return isLogged() ? <Navigate to="/perfil"  /> : children;
};
