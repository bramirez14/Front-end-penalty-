import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {  Menu, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { logout } from '../../auth/localStorage';

//import {FaAngleRight} from 'react-icons/fa'

export const Profile = ({history}) => {

  const handleLogout = () => {
   logout();
history.push('/')
 }

let name= JSON.parse(localStorage.getItem('name'))
return (

    <>

    <h1>Bienvenido  {name} </h1>

  
 <Menu  >

   <SubMenu  title="Solicitudes y Reservas">
    <Nav className="flex-column">
     <NavLink exact to="/anticipos/sueldos"> Anticipo de Sueldo </NavLink>
       <NavLink exact to="/solicitudes/vacaciones"> Solicitud de Vacaciones</NavLink>
         <NavLink exact to="/tarea1"> Reserva de Hotoles </NavLink>
           <NavLink exact to="/tarea1"> Reserva de Vuelos </NavLink>
             <NavLink exact to="/tarea1"> Reserva de Autos</NavLink>
               <NavLink exact to="/tarea1"> Reserva de Remises</NavLink>
                 </Nav>
   </SubMenu>
 <SubMenu  title="Rendiciones de Gastos"  ></SubMenu>
 <SubMenu  title="Contacto de Cliente"  ></SubMenu>
 <SubMenu  title="Reporte de Usuarios"  ></SubMenu>
  <SubMenu  title="Reporte de Gestión"  ></SubMenu>
  
  <h3>Contenido de Administradores</h3>
   <SubMenu  title="Alta de Usuarios"  ></SubMenu>
  <SubMenu  title="Listado de Usuarios"  ></SubMenu>
   <SubMenu  title="Modificacion de Usuarios"  ></SubMenu>
  <SubMenu  title="Alta de Empleado"  ></SubMenu>
   <SubMenu  title=" Listado de Empleados"  ></SubMenu>
  <SubMenu  title="Estado de Remitos"  ></SubMenu>

 
  
  </Menu>
<button onClick={handleLogout}>Logout</button>

    </>
  )
}