import React from 'react'
import {useContext,useEffect} from 'react'
import { UserContext } from '../../contexto/UserContext'
import { Button } from "antd";
import SidebarContext from '../context/SidebarContext'
import './css/perefilCristianAdmin.css'

import { Tarjeta } from '../helperPerfiles/Tarjeta'
import { logout } from '../../auth/localStorage';
export const PerfilCristianAdmin = ({history}) => {
  let token = JSON.parse(localStorage.getItem("token"));
let name = JSON.parse(localStorage.getItem("name"));
let id = JSON.parse(localStorage.getItem("id"));
 const Text=useContext(UserContext)
const {open}=Text
const handleLogout = () => {
  logout();
  console.log(logout())
  history.push('/login')
 
   
  
 }

    return (
        <>
   
        <div className={!open?'contenedor':'contenedor-active'}>
          <div className={!open?'container':'container-active'}>
            <h1>Bienvenido {name} espero que te encuentres bien!!!</h1>
            <Button className='btn' onClick={handleLogout}>Salir </Button>
          </div>
          
        </div>
       
        </>
    )
}
