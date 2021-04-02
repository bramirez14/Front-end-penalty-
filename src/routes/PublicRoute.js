import React from 'react'
import { Route, Redirect } from 'react-router'
import { isLogged } from '../auth/localStorage'
console.log(isLogged);
export const PublicRoute = props => isLogged()
    ? <Redirect to="/gerencia/perfil"/>
    : <Route {...props}/>

 