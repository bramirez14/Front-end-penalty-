import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { SolicitudVacaciones } from '../subComponents/SolicitudVacaciones'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    NavLink
  } from "react-router-dom";
import { AnticipoSueldo } from '../subComponents/AnticipoSueldo';
import { RouteGerente } from '../../routes/RouteGerente';
import { Item2 } from '../items/Item2';
import './perfilGerente.css'
export const PerfilGerente = () => {
    return (
  <>
  
  <Router>
  
 
  <div className='contenedor'>
  <div className='sector-a'> <h1>titulo</h1></div>
  <div className='sector-b'>caja B</div>
  <div className='sector-c'>caja C</div>
  </div>


  <Switch>
  <Route path ="/solicitudes/vacaciones" component={ SolicitudVacaciones }/>
  </Switch>  
  </Router>
  </>
      )
}
