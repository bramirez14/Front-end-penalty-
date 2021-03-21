import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./css/sidebar.css";
import { Avatar } from "../img/Avatar";
import { Item2 } from "../items/Item2";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className={sidebar?'div-navbar active':'div-navbar'}> </div>
      <div className={sidebar?'navbar active':'navbar'}>{/*importante para los iconos y para las alertas  de arriba de todo*/}
        <Link to="#" className="menu-bars">
        <GiHamburgerMenu onClick={showSidebar} className='hamburguesa'/>
        </Link>
        </div>
       
      <nav className={sidebar ? "nav-menu active" : "nav-menu"} style={{border:'solid 1px'}}>
      <AiOutlineClose onClick={showSidebar} className='x'/>
      <div className='sidebar-open'>
       <div className='sidebar-img'><Avatar/></div> 
       <div className='item'> <Item2/></div> 

       
       
      </div>
   
       
      </nav>
      

    </>
  );
};
