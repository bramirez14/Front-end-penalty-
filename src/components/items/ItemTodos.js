import React from 'react'
import { ProSidebar, Menu,MenuItem, SubMenu  } from 'react-pro-sidebar';
import { FaEnvelope, } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiPayMoney } from "react-icons/gi";
import { BsFillHouseFill } from "react-icons/bs";

export const ItemTodos = ({ click, click2,q }) => {
    return (
        <> 
        <Menu >
   
        <SubMenu
        title="Solicitudes y Reservas"
        icon={<FaEnvelope />}
       
      >
        <MenuItem onClick={q ? click : click2} >
          Anticipo de Sueldo
          <Link to="/sueldos" />
        </MenuItem>
        <MenuItem onClick={q ? click : click2} >
          Anticipo de Gastos
          <Link to="/anticipo/gastos" />
        </MenuItem>
        <MenuItem onClick={q ? click : click2} >
          Solicitud de Vacaciones
          <Link to="/vacaciones" />
        </MenuItem>
      </SubMenu>
      <SubMenu
        title="Rendiciones de Gastos"
        icon={<GiPayMoney  />}
       
      >
        <MenuItem onClick={q ? click : click2} >
          Rendicion de Gastos
          <Link to="/gastos" />
        </MenuItem>
      </SubMenu>
      </Menu>
      </>
    )
}
