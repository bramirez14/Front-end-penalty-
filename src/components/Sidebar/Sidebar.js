import React, { useState } from "react";
import { Layout, Menu, Drawer, Space } from "antd";
import {

  MenuOutlined,
 
} from "@ant-design/icons";
import "./css/sidebar.css";
import { NombreCompleto } from "./NombreCompleto";
import { Alerta } from "../alertas/Alerta";
import { MenuGerencia } from "./MenuGerencia";
import { AvatarImg } from "../img/Avatar";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { MenuEmpleados } from "./MenuEmpleados";
import { axiosURL } from "../../config/axiosURL";
import { logout } from "../../auth/localStorage";
import penalty from './logoPenalty.jpg'
export const Sidebar= ({children,history}) => {
  const N= localStorage.getItem('N')
  const id = localStorage.getItem("uid");
  const get = PeticionJWT();
  const { nombre, apellido } = get;
  const { Header, Content, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [state, setState] = useState({ visible: false, placement: "left" });

  const toggle = () => {
    setCollapsed(!collapsed);
    setState({
      visible: true,
    });
  };
  const onClose = () => {
    setState({
      visible: false,
    });
  };
  const handleLogout = async () => {
    await axiosURL.put(`/cs/${id}`, { conectado: "NO" });
    logout();
    history.push("/login");
  
  };


  /* let reconocerUsuario =
    n === "901"
      ? SidebarItems
      : n === "902"
      ? SidebarItems2
      : n === "903"
      ? SidebarItems2
      : SidebarItemsEmpleado; */
  return (
    <>
    <Layout  >
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0, background: "#46a461", height: 50,position: 'fixed', zIndex: 1, width: '100%' }}
      >
        <div className= "trigger" onClick= {toggle}>
        <MenuOutlined className='svg' />
        </div>
       
        <div className="nombre-alerta" >

          <Space>
            <Alerta />
            <NombreCompleto nombre={nombre} apellido={apellido} handleLogout={handleLogout} />
          </Space>
        </div>
      </Header>

      {/**Sector escritorio  */}
      <Layout style={{ background:"#46a461"}} >
        <Sider style={{background:"#46a461",
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
        width={240}
          className="sidebar"
          breakpoint="md"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
            if (broken === true) {
              setCollapsed(true);
            } else {
              setCollapsed(false);
            }
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          collapsed={false}
        >
          <div className="logoo" >
          <div className="nav-menu-items">
        <AvatarImg history={history} />
        <div style={{ marginTop: "20px" }}>
          <h4
            className="title-sidebar"
            style={{ color: "#fff", marginLeft: "50px" }}
          >
            {nombre} {apellido}
          </h4>
        </div>
            </div>
          </div>
          {
                  N==='901'|| N==='902'|| N==='903'?
            <MenuGerencia/>
              
              :
              <MenuEmpleados/>
              }
            
        </Sider>

{/**Sector response 768 o menor */}
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={state.visible}
          key={state.placement}
          className="drawer"
          width={245}
        >
          <Layout style={{ height: "100vh",width:245}}>
            <Sider style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,background:"#46a461"}}
            width={245}
        
            >
              <div className="logoo">
                  <div className="nav-menu-items">
        
          <AvatarImg history={history} />
          <div style={{ marginTop: "20px" }}>
            <h4
              className="title-sidebar"
              style={{ color: "#fff", marginLeft: "50px" }}
            >
              {nombre} {apellido}
            </h4>
          </div>
              </div>
              </div>
              {
                  N==='901'|| N==='902'|| N==='903'?
              <MenuGerencia/>
              :
              <MenuEmpleados/>
              }
            
           
            </Sider>
          </Layout>
        </Drawer>
{/** fin del sector response */}

        <Layout>
          <Content >
            
              {children}
          </Content>
        
        </Layout>
      </Layout>
      </Layout>
    </>
  );
};
