import { Route, Navigate } from 'react-router-dom'
import { isLogged } from '../auth/localStorage'

export const PrivateRoute =({ children })=> {
    return isLogged()? children : <Navigate to="/login"/>}

    
   
    

    
    
    
    
    
    
    
    
    
    
