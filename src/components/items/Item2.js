import React from "react";
import {
  ProSidebar,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";

export const Item2 = ({click,click2}) => {
  const mediaqueryList = window.matchMedia("(max-width: 768px)");
  const q=mediaqueryList.matches
  return (
    <ProSidebar>
      <Menu>
        <div style={{ display: "flex" }}>
          {" "}
          <BsFillHouseFill
            style={{
              fontSize: '17px',
              position: 'absolute',
              left: '21px',
              top: '14px',
              color:'white'
            }}
          />
          <MenuItem style={{ marginLeft: "55px", fontSize: "18px",color:'white' }} onClick={q?click:click2} >
            Dashboard
            <Link to="/gerencia/perfil" />
          </MenuItem>
        </div>
        <SubMenu
          title="Solicitudes y Reservas"
          icon={<FaEnvelope />}
          style={{ fontSize: "18px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q?click:click2} >
            Anticipo de Sueldo
            <Link to="/sueldos" />
          </MenuItem>
          <MenuItem onClick={q?click:click2} >
            Anticipo de Gastos
            <Link to="/anticipo/gastos" />
          </MenuItem>
          <MenuItem onClick={q?click:click2} >
            Solicitud de Vacaciones
            <Link to="/vacaciones" />
          </MenuItem>
         
        </SubMenu>
        <SubMenu
          title="Rendiciones de Gastos"
          icon={<FaEnvelope />}
          style={{ fontSize: "18px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q?click:click2}>
                Rendicion de Gastos
            <Link to="/gastos" />
          </MenuItem>
       
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};
