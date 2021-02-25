import React from 'react'
import { Route, Redirect } from 'react-router'
import { administrativo, isLogged } from '../auth/localStorage'

export const RouteAdmin = props=> isLogged() && administrativo()=='Admin' ?
 <Route { ...props }/>:
 <Redirect to="/profile"/>
