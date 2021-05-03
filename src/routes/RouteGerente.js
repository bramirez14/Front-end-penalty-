import React from "react";
import { Route, Redirect } from "react-router";
import { gerente, isLogged, logout } from "../auth/localStorage";

export const RouteGerente = (props) => {
  console.log(gerente(), isLogged());

  return (
    <>
      {isLogged() ? (
        gerente() == "Gerente" ? (
          <Route {...props} />
        ) : (
          ''
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
