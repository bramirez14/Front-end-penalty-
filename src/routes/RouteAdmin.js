 import React from "react";
import { Route, Redirect } from "react-router";
import { administrativo, isLogged } from "../auth/localStorage";

export const RouteAdmin= (props) => {
  return (
    <>
      {isLogged() && administrativo()=== "Admin" ? (
        <Route {...props} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};
