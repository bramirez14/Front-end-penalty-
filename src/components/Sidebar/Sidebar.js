import React, { useState, useContext, useEffect, useRef } from "react";
import "./css/sidebar.css";
import { AvatarImg } from "../img/Avatar";
import { UserContext } from "../../contexto/UserContext";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { Alerta } from "../alertas/Alerta";
import { Row, Col, } from "antd";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";
import { axiosURL } from "../../config/axiosURL";
import { logout } from "../../auth/localStorage";

import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import { FaBars, FaSearch } from "react-icons/fa";
import { SidebarItems } from "./SidebarItems";
import { SidebarItems2 } from "./SidebarItems2";
import { SidebarItemsEmpleado } from "./SidebarItemsEmpleado";
import { BotomHamburguesa } from "../botones/BotomHamburguesa";
import { NombreCompleto } from "./NombreCompleto";


export const Sidebar = ({ history }) => {
  const abrirCerrarHamburguesa = () => setOpen(!open);
  const { setAuth } = useContext(UserContext);
  const id = localStorage.getItem("uid");
  const mediaqueryList = window.matchMedia("(max-width: 576px)");
  const q = mediaqueryList.matches;
  const n = localStorage.getItem("N");
  const Sidebar = useContext(UserContext);
  const { open, setOpen } = Sidebar;
  const get = PeticionJWT();
  const { nombre, apellido } = get;

  const handleLogout = async () => {
    await axiosURL.put(`/cs/${id}`, { conectado: "NO" });
    logout();
    history.push("/login");
    setAuth(false);
  };
  let reconocerUsuario =
    n === "901"
      ? SidebarItems
      : n === "902"
      ? SidebarItems2
      : n === "903"
      ? SidebarItems2
      : SidebarItemsEmpleado;
  return (
    <>
      <Row>
        <Col>
          <div className="navbar">
            <div className='hamburguesa'> <BotomHamburguesa abrirCerrarHamburguesa={abrirCerrarHamburguesa}/></div>
            <div className='nomaler'style={{display:'flex'}}> 
            <div className='alerta' ><Alerta/></div> 
            <div className='nombreCompleto'><NombreCompleto nombre={nombre} apellido={apellido} handleLogout={handleLogout}/></div>
            
            </div>
          </div>
        </Col>
      </Row>

      <nav className={open ? "nav-menu active" : "nav-menu"}>
        <div className="nav-menu-items">
          <AiIcons.AiOutlineClose
            onClick={abrirCerrarHamburguesa}
            className="x"
          />
          <AvatarImg history={history} />
          <div style={{ marginTop: "20px" }}>
            <h4
              className="title-sidebar"
              style={{ color: "#fff", marginLeft: "50px" }}
            >
              {nombre} {apellido}
            </h4>
          </div>
          <div style={{ marginTop: 20 }}>
            {reconocerUsuario.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
