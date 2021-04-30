 import React from "react";
import { Route, Redirect } from "react-router";
import { administrativo, isLogged, logout } from "../auth/localStorage";

export const RouteAdmin= (props) => {
  console.log(administrativo());
  return (
    <>
   {isLogged() ? (
        administrativo() == "Admin" ? (
          <Route {...props} />
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
