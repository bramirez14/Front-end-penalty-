import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./css/sidebar.css";
import { BotonHamburguesa } from "./BotonHamburguesa";
import { Item } from "../items/Item";
import { Avatar } from "../img/Avatar";

export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
  
      <div className={sidebar?'navbar active':'navbar'}>
        <Link to="#" className="menu-bars">
          <BotonHamburguesa open={sidebar} click={showSidebar} />
        </Link>
        </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"} style={{border:'solid 1px'}}>
      <div className='sidebar-open'>
        <Avatar/>
        <Item/>
      </div>
 
       
      </nav>
      

    </>
  );
};
