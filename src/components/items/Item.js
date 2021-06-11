import React, { useEffect } from "react";
import { SidebarHeader,SidebarContent, ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FaEnvelope, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { TiUser } from "react-icons/ti";
import PeticionGET from "../../config/PeticionGET";

export const Item = ({ click, click2 }) => {
  const mediaqueryList = window.matchMedia("(max-width: 768px)");
  const q = mediaqueryList.matches;
  const tipo = localStorage.getItem("type");
  const n = localStorage.getItem("N");
const id= localStorage.getItem('uid')
const pg= PeticionGET(`./${id}`)
  return tipo === "Gerente" ? (
    <ProSidebar>
        <SidebarHeader>
    {/**
     *  You can add a header for the sidebar ex: logo
     */}
     <h5 style={{marginLeft:'40px',color:'#fff'}}>{pg.nombre} {pg.apellido} </h5>
  </SidebarHeader>
       <SidebarContent>
      <Menu>
       
         
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
              <Link to="/register" />
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
  ) : (
    <ProSidebar>
      <SidebarContent>
      <Menu>
        <div style={{ display: "flex" }}>
          {" "}
          <BsFillHouseFill
            style={{
              fontSize: "17px",
              position: "absolute",
              left: "21px",
              top: "14px",
              color: "white",
            }}
          />
          <MenuItem
            style={{ marginLeft: "55px", fontSize: "14px", color: "white" }}
            onClick={q ? click : click2}
          >
            Home
            <Link to="/perfil" />
          </MenuItem>
        </div>

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
  );
};
