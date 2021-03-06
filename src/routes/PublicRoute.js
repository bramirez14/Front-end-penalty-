import React from 'react'
import { Route, Redirect } from 'react-router'
import { isLogged } from '../auth/localStorage'
export const PublicRoute = props => isLogged()
    ? <Redirect to="/perfil"/>
    : <Route {...props}/>

 