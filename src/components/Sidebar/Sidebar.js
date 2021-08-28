import React, { useState, useContext, useEffect, useRef } from "react";
import "./css/sidebar.css";
import { AvatarImg } from "../img/Avatar";
import { UserContext } from "../../contexto/UserContext";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { Row, Col, } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { logout } from "../../auth/localStorage";

import * as AiIcons from "react-icons/ai";
import SubMenu from "./SubMenu";
import { SidebarItems } from "./SidebarItems";
import { SidebarItems2 } from "./SidebarItems2";
import { SidebarItemsEmpleado } from "./SidebarItemsEmpleado";
import { BotomHamburguesa } from "../botones/BotomHamburguesa";
import { NombreCompleto } from "./NombreCompleto";
import io from "socket.io-client";
import CustomScroll from 'react-custom-scroll';

const mediaqueryList = window.matchMedia("(max-width: 1024px)");
const q = mediaqueryList.matches;
let useClickOutside = q?
   (handler) => {
    let domNode = useRef();
    useEffect(() => {
      let maybeHandler = (event) => {
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
  }
:()=>{}


export const Sidebar = ({ history }) => {
  let [isOpen, setIsOpen] = useState(false);
  const abrirCerrarHamburguesa = () => setOpen(!open)
  const { setAuth } = useContext(UserContext);
  const id = localStorage.getItem("uid");

  const n = localStorage.getItem("N");
  const Sidebar = useContext(UserContext);
  const { open, setOpen } = Sidebar;
  const get = PeticionJWT();
  const { nombre, apellido } = get;


  let domNode = useClickOutside(() => {
    setIsOpen(false);
    setOpen(false)

  });


  const handleLogout = async () => {
    await axiosURL.put(`/cs/${id}`, { conectado: "NO" });
    logout();
    history.push("/login");
    setAuth(false);
    const socket =  io.connect( "http://localhost:4000",{ 
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,})
     console.log(socket);
      socket?.disconnect();
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
            {/* <div className='alerta' ><Alerta/></div>  */}
            <div className='nombreCompleto'><NombreCompleto nombre={nombre} apellido={apellido} handleLogout={handleLogout}/></div>
            
            </div>
          </div>
        </Col>
      </Row>
      <div className={open?'black':''}></div>

      <nav className={open ? "nav-menu active" : "nav-menu"} ref={domNode} >
       
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
          <CustomScroll heightRelativeToParent="calc(80% - 100px)">
          <div  style={{ marginTop: 20,paddingRight:12 }}>
            {reconocerUsuario.map((item, index) => {
              return <SubMenu item={item} key={index} 
              open={open}
              setOpen={setOpen}
              />;
            })}
          </div>
          </CustomScroll>
        </div>
      </nav>
    </>
  );
};
