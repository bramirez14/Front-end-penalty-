import React from "react";
import { Route, Redirect } from "react-router";
import { gerente, isLogged, logout } from "../auth/localStorage";

export const RouteGerente = (props) => {

  return (
    <>
      {isLogged() ? (
        gerente() ==="Gerente"  ? (
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
