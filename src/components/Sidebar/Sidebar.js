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

/**Cierra cuadno clickeas fuera del div */
let useClickOutside = (handler) => {
  let domNode = useRef();
console.log(handler);
  useEffect(() => {
    let maybeHandler = (event) => {
     console.log(!domNode.current.contains(event.target))
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};


export const Sidebar = ({history}) => {
  let [isOpen, setIsOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  const [state, setState] = useState(false);
  const id = localStorage.getItem('uid');
  const mediaqueryList = window.matchMedia("(max-width: 576px)");
  const q = mediaqueryList.matches;
  const Sidebar = useContext(UserContext);
  const { open, setOpen } = Sidebar;
  const showSidebar = () => setOpen(!open);
  const showSidebar2 = () => setOpen(open);
  console.log(open);
  const get = PeticionJWT();
  const { nombre, apellido, nvendedor } = get;
 
  const onBlur = () => setState(!state);

  const toggle = (e) => setState(!state)

  const handleLogout = async() => {
    await axiosURL.put(`/cs/${id}`,{conectado:'NO'})
    console.log('holaaa');
    logout();
    history.replace("/login");
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

        <div className="datosPersonales" ref={domNode}>
          <Alerta />

          <span    onClick={() => setIsOpen((isOpen) => !isOpen)}className="nombreCompleto">
            {nombre} {apellido} <CaretDownOutlined  />
          </span>
          {isOpen === true && (
            <>
            <div id="drop" >
              <div className="contenedor-drop">
                <div className="drop-icon">
                  <ImExit style={{marginLeft:7}}/>
                </div>
                <div className="drop-text">
                <button className='boton-drop' onClick={handleLogout}>Salir</button >
                </div>
              </div>
             
            </div>
            </>
          )}
        </div>
      </div>
      <nav className={open ? "nav-menu active" : "nav-menu"}>
        <AiOutlineClose onClick={showSidebar} className="x" />
        <div className="sidebar-open">
          <div className="sidebar-img">
            <AvatarImg />
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
