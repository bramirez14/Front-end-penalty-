import React, { useState } from "react";
import { Layout, Menu, Drawer, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
 
} from "@ant-design/icons";
import "./css/sidebar.css";
import { NombreCompleto } from "./NombreCompleto";
import { Alerta } from "../alertas/Alerta";
import { MenuGerencia } from "./MenuGerencia";
import { AvatarImg } from "../img/Avatar";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { MenuEmpleados } from "./MenuEmpleados";

export const Sidebar= ({children,history}) => {
  const N= localStorage.getItem('N')
  const get = PeticionJWT();
  const { nombre, apellido } = get;
  const { Header, Content, Footer, Sider } = Layout;
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
  return (
    <>
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0, background: "#46a461", height: 50,position: 'fixed', zIndex: 1, width: '100%' }}
      >
        <div className= "trigger" onClick= {toggle}>
        <MenuOutlined className='svg' />
        </div>
       
        <div className="nombre-alerta">
          <Space>
            <Alerta />
            <NombreCompleto nombre={nombre} apellido={apellido} />
          </Space>
        </div>
      </Header>

      {/**Sector escritorio  */}
      <Layout style={{ height: "100vh",background:"#46a461"}} >
        <Sider style={{background:"#46a461"}}
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
          width={200}
        >
          <Layout style={{ height: "100vh",width:270 }}>
            <Sider style={{background:"#46a461"}}
        width={250}
            
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
            <div
              className="site-layout-background"
              style={{marginTop:50}}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Penalty Argentina ©2021 Created by Penalty Corporation
          </Footer>
        </Layout>
      </Layout>
      </Layout>
    </>
  );
};
