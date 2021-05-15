import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";


export const Item2 = ({click,click2}) => {
  const mediaqueryList = window.matchMedia("(max-width: 768px)");
  const q = mediaqueryList.matches
  const  tipo = localStorage.getItem('type')
  return (
    tipo==='Gerente'?
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
          <MenuItem style={{ marginLeft: "55px", fontSize: "14px",color:'white' }} onClick={q?click:click2} >
            Home
            <Link to="/gerencia/perfil" />
          </MenuItem>
        </div>
        
        <SubMenu
        title="Aprobaciones"
        icon={<FaEnvelope />}
        style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}} >
            Aprobacion de Sueldo
            <Link to="/aprobacion/sueldo" />
          </MenuItem>
        </SubMenu>
        <SubMenu
          title="Solicitudes y Reservas"
          icon={<FaEnvelope />}
          style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}} >
            Anticipo de Sueldo
            <Link to="/sueldos" />
          </MenuItem>
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}} >
            Anticipo de Gastos
            <Link to="/anticipo/gastos" />
          </MenuItem>
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}} >
            Solicitud de Vacaciones
            <Link to="/vacaciones" />
          </MenuItem>
         
        </SubMenu>
        <SubMenu
          title="Rendiciones de Gastos"
          icon={<GiPayMoney  style={{fontSize:'20px'}}/>}
          style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}}>
                Rendicion de Gastos
            <Link to="/gastos" />
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
    :
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
          <MenuItem style={{ marginLeft: "55px", fontSize: "14px",color:'white' }} onClick={q?click:click2} >
            Home
            <Link to="/perfil" />
          </MenuItem>
        </div>
        
        <SubMenu
          title="Solicitudes y Reservas"
          icon={<FaEnvelope />}
          style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}} >
            Anticipo de Sueldo
            <Link to="/sueldos" />
          </MenuItem>
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}} >
            Anticipo de Gastos
            <Link to="/anticipo/gastos" />
          </MenuItem>
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}} >
            Solicitud de Vacaciones
            <Link to="/vacaciones" />
          </MenuItem>
         
        </SubMenu>
        <SubMenu
          title="Rendiciones de Gastos"
          icon={<GiPayMoney  style={{fontSize:'20px'}}/>}
          style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q?click:click2} style={{fontSize:'14px'}}>
                Rendicion de Gastos
            <Link to="/gastos" />
          </MenuItem>
        </SubMenu>
     </Menu>
   </ProSidebar>
  );
};
