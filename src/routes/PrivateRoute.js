import React from 'react'
import { Route, Redirect } from 'react-router'
import { isLogged } from '../auth/localStorage'

export const PrivateRoute = props => isLogged()

    ? <Route { ...props }/>
    : <Redirect to="/login"/>
    

    
    
    
    
    
    
    
    
    
    
