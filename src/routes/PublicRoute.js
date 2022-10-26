import {  Navigate } from "react-router";
import { isLogged } from "../auth/localStorage";
export const PublicRoute = ({ children }) => {
  return isLogged() ? <Navigate to="/perfil" /> : children;
};
