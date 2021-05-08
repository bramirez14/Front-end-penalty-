import React, { useState, useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./css/sidebar.css";
import { Avatar } from "../img/Avatar";
import { Item2 } from "../items/Item2";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../../contexto/UserContext";
import { PeticionJWT } from "../../auth/PeticionJWT";

export const Sidebar = () => {
  const mediaqueryList = window.matchMedia("(max-width: 576px)");
  const q = mediaqueryList.matches;
  const Sidebar = useContext(UserContext);
  const { open, setOpen } = Sidebar;
  const showSidebar = () => setOpen(!open);
  const showSidebar2 = () => setOpen(open);
  const get= PeticionJWT()
  const {nombre,apellido}=get
  return (
    <>
      {q ? (
        <div className={open ? "div-navbar active" : "div-navbar"}> </div>
      ) : (
        ""
      )}

      <div
        className={open ? "navbar active" : "navbar"}

      >
        {/*importante para los iconos y para las alertas  de arriba de todo*/}

        <div to="#" className="menu-bars">
          <GiHamburgerMenu onClick={showSidebar} className="hamburguesa" />
        </div>
        <div className='datosPersonales'> <span> {nombre} {apellido} </span></div>
          
      </div>

      <nav className={open ? "nav-menu active" : "nav-menu"}>
        <AiOutlineClose onClick={showSidebar} className="x" />
        <div className="sidebar-open">
          <div className="sidebar-img">
            <Avatar />
          </div>
          <div className="item">
            {" "}
            <Item2 click={showSidebar} click2={showSidebar2} />{" "}
          </div>
        </div>
      </nav>
    </>
  );
};
