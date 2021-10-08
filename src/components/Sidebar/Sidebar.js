import React, { useState, useContext, } from "react";
import { Avatar, Drawer, Grid, Layout,  } from 'antd';
/* import SubMenu from "./SubMenu"; */
import { AvatarImg } from "../img/Avatar";
import { UserContext } from "../../context/UserContext";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { Row, Col, } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { logout } from "../../auth/localStorage";
import { SidebarItems } from "./SidebarItems";
import { SidebarItems2 } from "./SidebarItems2";
import { SidebarItemsEmpleado } from "./SidebarItemsEmpleado";
import { BotomHamburguesa } from "../botones/BotomHamburguesa";
import { NombreCompleto } from "./NombreCompleto";
import CustomScroll from 'react-custom-scroll';
import { Alerta } from "../alertas/Alerta";
import "./css/sidebar.css";
import { MenuGerencia } from "./MenuGerencia";
import { MenuEmpleados } from "./MenuEmpleados";
import { PeticionGET } from "../../config/PeticionGET";
const {  Sider } = Layout;
const { useBreakpoint } = Grid;

export const Sidebar = ({ history,alertas,setAlertas,getAlertas }) => {
  let [isOpen, setIsOpen] = useState(false);
  const abrirCerrarHamburguesa = () => setOpen(!open)
  const id = localStorage.getItem("uid");
 const datos= PeticionGET(`/${id}`)
  const N= localStorage.getItem("N");
  const Sidebar = useContext(UserContext);
  const { open, setOpen } = Sidebar;
  const get = PeticionJWT();
  const { nombre, apellido } = get;

  const handleLogout = async () => {
    await axiosURL.put(`/cs/${id}`, { conectado: "NO" });
    logout();
    history.push("/login");

  };


     const  onClose = () => setOpen(!open);
  const screens = useBreakpoint();
  return (
    <>

      <Row>
        <Col>
          <div className="navbar">
            <div className='hamburguesa'> <BotomHamburguesa abrirCerrarHamburguesa={abrirCerrarHamburguesa}/></div>
            <div className='nomaler'style={{display:'flex'}}> 
            <div className='alerta' ><Alerta alertas={alertas} setAlertas={setAlertas} getAlertas={getAlertas} /></div> 
            <div className='nombreCompleto'><NombreCompleto nombre={nombre} apellido={apellido} handleLogout={handleLogout}/></div>
            
            </div>
          </div>
        </Col>
      </Row>

   { open===false?'':  <Drawer  
      
      placement={'left'}
      /* closable={false} */
      onClose={onClose}
      visible={open}
      key={'left'}
      mask={screens.lg?false:true}
      width={227}
>
 
{/*   <AvatarImg history={history} /> */}
<div style={{height:100, padding:10, backgroundColor:'#46a461',borderBottom:'solid 1px #ffff',width:227}}>
  <Avatar size={64} src={datos.imagen} /> 
  <span>{datos.nombre}{datos.apellido} </span>
  <h5>{datos.email} </h5>
  </div>
    <Sider
    className='sider'
       style={
        open===false?{
        display:"none",

        }:
        {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left:0,
        backgroundColor:'#46a461'

      }}
      
      width={227}

    >

        {
          N==='901'|| N==='902'|| N==='903'?
        <MenuGerencia
                    open={open}
                    setOpen={setOpen}
                  
                    />
                    : 
        <MenuEmpleados
                    open={open}
                    setOpen={setOpen}

                    />
        }
          
            
           
          

          
    </Sider>
      </Drawer>}
    </>
  );
};
