import React, { useEffect } from "react";
import { SidebarHeader,SidebarContent, ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaEnvelope, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { TiUser } from "react-icons/ti";
import { MdTrendingUp} from "react-icons/md";

import {PeticionGET }from "../../config/PeticionGET";

export const Item = ({ click, click2 }) => {
  const mediaqueryList = window.matchMedia("(max-width: 768px)");
  const q = mediaqueryList.matches;
  const tipo = localStorage.getItem("type");
  const n = localStorage.getItem("N");
const id= localStorage.getItem('uid')
const pg= PeticionGET(`./${id}`)
  return (
  <>
    <ProSidebar  >
        <SidebarHeader>
    {/**
     *  You can add a header for the sidebar ex: logo
     */}
     <h5 style={{color:'#fff',textAlign:'center'}}>{pg.nombre} {pg.apellido} </h5>
  </SidebarHeader>
       <SidebarContent>
      <Menu popperArrow='true'>
          <MenuItem
            onClick={q ? click : click2}
            style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
            icon={ <BsFillHouseFill
              style={{
                fontSize: "17px",
                position: "absolute",
                left: "10px",
                top: "8px",
                color: "white",
              }}
            />}
          >
            Home
            <Link to="/perfil" />
          </MenuItem>
        {/**Sector de  Gerente 901 */}
        {n === "901" && (
          <>
          <SubMenu
            title="Usuarios"
            icon={<TiUser style={{ fontSize: "20px" }} />}
            style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
          >
            <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Registro de usuarios
              <Link to="/registrar/usuario" />
            </MenuItem>
          </SubMenu>
          
          <SubMenu
            title="Aprobaciones"
            icon={<FaCheck />}
            style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
          >
             <MenuItem
                onClick={q ? click : click2}
                style={{ fontSize: "14px" }}
              >
                Aprobacion de Sueldo
                <Link to="/aprobacion/sueldo" />
              </MenuItem>
              <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Aprobacion de Vacaciones
              <Link to="/aprobacion/vacaciones" />
            </MenuItem>
            <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Aprobacion de Gastos
              <Link to="/aprobacion/gastos" />
            </MenuItem>
          </SubMenu>
          <SubMenu
          title="Reportes de Gestion"
          icon={<MdTrendingUp style={{ fontSize: "20px" }} />}
          style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}>
          <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Estado de Remitos
              <Link to="/reportes/gestion/remitos" />
            </MenuItem>
            <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Facturacion Por Vendedor
              <Link to="/reportes/facturacion/ventas" />
            </MenuItem>
          </SubMenu>
          </>
        )}
        {/**Fin Sector de  Gerente 901 */}

        {/**Sector de  Gerente 902*/}
        {n === "902" && (
          <>
            <SubMenu
              title="Aprobaciones"
              icon={<FaCheck />}
              style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
            >
              <MenuItem
                onClick={q ? click : click2}
                style={{ fontSize: "14px" }}
              >
                Aprobacion de Sueldo
                <Link to="/aprobacion/sueldo" />
              </MenuItem>
              <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Aprobacion de Vacaciones
              <Link to="/aprobacion/vacaciones" />
            </MenuItem>
            <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Aprobacion de Gastos
              <Link to="/aprobacion/gastos" />
            </MenuItem>
            </SubMenu>
          </>
        )}
        {/**Fin Sector de  Gerente 902*/}

         {/**Sector de  Gerente 903*/}
         {n === "903" && (
          <>
            <SubMenu
              title="Aprobaciones"
              icon={<FaCheck />}
              style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
            >
              <MenuItem
                onClick={q ? click : click2}
                style={{ fontSize: "14px" }}
              >
                Aprobacion de Sueldo
                <Link to="/aprobacion/sueldo" />
              </MenuItem>
              <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Aprobacion de Vacaciones
              <Link to="/aprobacion/vacaciones" />
            </MenuItem>
            <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
              Aprobacion de Gastos
              <Link to="/aprobacion/gastos" />
            </MenuItem>
            </SubMenu>
          </>
        )}
        {/**Fin Sector de  Gerente 903*/}

        <SubMenu
          title="Solicitudes y Reservas"
          icon={<FaEnvelope />}
          style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
            Anticipo de Sueldo
            <Link to="/sueldos" />
          </MenuItem>
          <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
            Anticipo de Gastos
            <Link to="/anticipo/gastos" />
          </MenuItem>
          <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
            Solicitud de Vacaciones
            <Link to="/vacaciones" />
          </MenuItem>
        </SubMenu>
        <SubMenu
          title="Rendiciones de Gastos"
          icon={<GiPayMoney style={{ fontSize: "20px" }} />}
          style={{ fontSize: "14px", color: "white", marginLeft: "10px" }}
        >
          <MenuItem onClick={q ? click : click2} style={{ fontSize: "14px" }}>
            Rendicion de Gastos
            <Link to="/gastos" />
          </MenuItem>
        </SubMenu>
      </Menu>
    </SidebarContent>
    </ProSidebar>
  </>)
};
