import React from "react";
import { Route, Redirect } from "react-router";
import { gerente, isLogged, employee} from "../auth/localStorage";

export const RouteEmpleado = (props) => {
  console.log(gerente(), isLogged());

  return (
    <>
      {isLogged() ? (
        employee() === "Empleado" || employee() === "Empleada" || gerente() === "Gerente"  ? (
          <Route {...props} />
        ) : (
          ''
        )
      ) : (
        <Redirect to="/perfil" />
      )}
    </>
  );
};
