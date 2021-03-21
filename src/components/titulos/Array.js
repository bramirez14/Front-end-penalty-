import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { arrayRoutes } from '../../routes/arrayRoutes';
export const Array = () => {
    <Switch>
    {arrayRoutes.map((prop) => {
      
        return (
          <Route
            path={ prop.path}
            component={prop.component}
            
          />
        );
      
      
    })}

  </Switch>
}
