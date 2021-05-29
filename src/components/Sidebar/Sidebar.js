import React, { useState, useContext } from "react";
import "./css/sidebar.css";
import { Avatar } from "../img/Avatar";
import { Item } from "../items/Item";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../../contexto/UserContext";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { Alerta } from "../alertas/Alerta";

export const Sidebar = () => {
  const mediaqueryList = window.matchMedia("(max-width: 576px)");
  const q = mediaqueryList.matches;
  const Sidebar = useContext(UserContext);
  const { open, setOpen } = Sidebar;
  const showSidebar = () => setOpen(!open);
  const showSidebar2 = () => setOpen(open);
  console.log(open);
  const get= PeticionJWT()
  const {nombre,apellido,nvendedor}=get
  return (
    <>
      {q ? (
        <div className={open ? "div-navbar active" : "div-navbar"}> </div>
      ) : (
        ""
      )}

      <div className={open ? "navbar active" : "navbar"}>
        {/*importante para los iconos y para las alertas  de arriba de todo*/}

        <div to="#" className="menu-bars">
          <GiHamburgerMenu onClick={showSidebar} className="hamburguesa" />
        </div>
       
      <div className='datosPersonales'> 
        <Alerta/>
      <span className='nombreCompleto'>
           {nombre} {apellido} 
      </span>
           
    </div>
          
      </div>

      <nav className={open ? "nav-menu active" : "nav-menu"}>
        <AiOutlineClose onClick={showSidebar} className="x" />
        <div className="sidebar-open">
          <div className="sidebar-img">
            <Avatar />
          </div>
          <div className="item">
            {" "}
            <Item click={showSidebar} click2={showSidebar2} />{" "}
          </div>
        </div>
      </nav>
    </>
  );
};
