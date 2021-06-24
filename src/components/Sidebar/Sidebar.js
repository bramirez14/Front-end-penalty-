import React, { useState, useContext,useEffect,useRef } from "react";
import "./css/sidebar.css";
import { AvatarImg } from "../img/Avatar";
import { Item } from "../items/Item";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../../contexto/UserContext";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { Alerta } from "../alertas/Alerta";
import { Dropdown, Menu } from "antd";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";
import { ImExit } from "react-icons/im";
import axiosURL from "../../config/axiosURL";
import { logout } from "../../auth/localStorage";
import { NombreCompleto } from "./NombreCompleto";



export const Sidebar = ({history}) => {
  const {setAuth} = useContext(UserContext)
  const [state, setState] = useState(false);
  const id = localStorage.getItem('uid');
  const mediaqueryList = window.matchMedia("(max-width: 576px)");
  const q = mediaqueryList.matches;
  const Sidebar = useContext(UserContext);
  const { open, setOpen } = Sidebar;
  const showSidebar = () => setOpen(!open);
  const showSidebar2 = () => setOpen(open);
  const get = PeticionJWT();
  const { nombre, apellido } = get;
  const handleLogout = async() => {
    await axiosURL.put(`/cs/${id}`,{conectado:'NO'})
    logout();
    history.push("/login");
    setAuth(false)
  };
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

        <div className="datosPersonales" >
          <Alerta />

          <span   className="nombreCompleto">
           <NombreCompleto nombre={nombre} apellido={apellido}handleLogout={handleLogout}/>
          </span>
       
        </div>
      </div>
      <nav className={open ? "nav-menu active" : "nav-menu"}>
        <AiOutlineClose onClick={showSidebar} className="x" />
        <div className="sidebar-open">
            <AvatarImg history={history} />
          <div className="item">
            {" "}
            <Item click={showSidebar} click2={showSidebar2} />{" "}
          </div>
        </div>
      </nav>
      
    </>
  );
};
