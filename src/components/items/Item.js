import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Menu, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Avatar } from "../img/Avatar";

export const Item = () => {
  return (
    <>
        
    <Menu style={{marginTop:'50px'}}>
      <SubMenu title="Solicitudes y Reservas">
        <Nav className="flex-column">
          <NavLink exact to="/anticipos/sueldos">
            {" "}
            Anticipo de Sueldo{" "}
          </NavLink>
          <NavLink exact to="/solicitudes/vacaciones">
            {" "}
            Solicitud de Vacaciones
          </NavLink>
          <NavLink exact to="/tarea1">
            {" "}
            Reserva de Hotoles{" "}
          </NavLink>
          <NavLink exact to="/tarea1">
            {" "}
            Reserva de Vuelos{" "}
          </NavLink>
          <NavLink exact to="/tarea1">
            {" "}
            Reserva de Autos
          </NavLink>
          <NavLink exact to="/tarea1">
            {" "}
            Reserva de Remises
          </NavLink>
        </Nav>
      </SubMenu>
      <SubMenu title="Rendiciones de Gastos">
        <Nav className="flex-column">
          <NavLink exact to="/rendicion/gastos">
            {" "}
            Rendicion de Gastos{" "}
          </NavLink>
          <NavLink exact to="/archivo/gastos">
            {" "}
            Archivo de Gastos{" "}
          </NavLink>
        </Nav>
      </SubMenu>
      <SubMenu title="Contacto de Cliente"></SubMenu>
      <SubMenu title="Reporte de Usuarios"></SubMenu>
      <SubMenu title="Reporte de Gestión"></SubMenu>

      <h3>Contenido de Administradores</h3>
      <SubMenu title="Alta de Usuarios"></SubMenu>
      <SubMenu title="Listado de Usuarios"></SubMenu>
      <SubMenu title="Modificacion de Usuarios"></SubMenu>
      <SubMenu title="Alta de Empleado"></SubMenu>
      <SubMenu title=" Listado de Empleados"></SubMenu>
      <SubMenu title="Estado de Remitos"></SubMenu>
    </Menu>
    </>
  );
};
