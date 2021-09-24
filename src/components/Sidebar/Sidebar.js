import React, { useState, useContext, } from "react";
import { Drawer, Grid } from 'antd';
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

const { useBreakpoint } = Grid;

export const Sidebar = ({ history,alertas,setAlertas,getAlertas }) => {
  let [isOpen, setIsOpen] = useState(false);
  const abrirCerrarHamburguesa = () => setOpen(!open)
  const id = localStorage.getItem("uid");

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
  console.log(screens);
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
      <Drawer  
      title={<h3 style={{color:'#ffff'}}><b>PENALTY</b></h3>}
      placement={'left'}
      /* closable={false} */
      onClose={onClose}
      visible={open}
      key={'left'}
      width={220}
      mask={screens.lg?false:true}
>
      
      <AvatarImg history={history} />
      <CustomScroll heightRelativeToParent="calc(80% - 100px)">
        <div style={{width:247}}>

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
          
            
           
          </div>
          </CustomScroll>
      </Drawer>
    </>
  );
};
