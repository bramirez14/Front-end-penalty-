import React from 'react'
import { Route, Redirect } from 'react-router'
import { gerente, isLogged } from '../auth/localStorage'

export const RouteGerente = props=> isLogged() && gerente()=='Gerente' ?
 <Route { ...props }/>:
 <Redirect to="/profile"/>

