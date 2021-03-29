import React, { useState,useContext } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./css/sidebar.css";
import { Avatar } from "../img/Avatar";
import { Item2 } from "../items/Item2";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../../contexto/UserContext";

export const Sidebar = () => {
  

 const Sidebar=useContext(UserContext)
 const {open,setOpen}=Sidebar;
  const showSidebar = () => setOpen(!open);
  return (
    <>
   
      {/*<div className={sidebar?'div-navbar active':'div-navbar'}> </div>*/}

      <div className={open?'navbar active':'navbar'}>{/*importante para los iconos y para las alertas  de arriba de todo*/}
       
        <Link to="#" className="menu-bars">
        <GiHamburgerMenu onClick={showSidebar} className='hamburguesa'/>
        </Link>
      
        </div>
       
      <nav className={open ? "nav-menu active" : "nav-menu"} >
      <AiOutlineClose onClick={showSidebar} className='x'/>
      <div className='sidebar-open'>
       <div className='sidebar-img'><Avatar/></div> 
       <div className='item'> <Item2/></div> 
      
       
       
      </div>
      
       
      </nav>
 
        

    </>
  );
};
