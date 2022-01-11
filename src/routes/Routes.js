import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Login } from "../components/login/Login";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardRoutes } from "./DashboardRoutes";
export const RoutesCompenent= () => {

  return (
    <BrowserRouter>
      <Routes >
        <Route path="/login" element={
          
          <PublicRoute  >
              <Login/>
        </PublicRoute>

        } />
       
       <Route path="/*" element={
          
          <PrivateRoute>
            <DashboardRoutes/>
          </PrivateRoute>

      } />
       <Route path="/" element={<Navigate replace to="/perfil" />} />
      </Routes>
    

    </BrowserRouter>
  );
};
