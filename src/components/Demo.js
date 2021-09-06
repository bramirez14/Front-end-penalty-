import React, { useState } from "react";
import { Layout, Menu, Drawer, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import CustomScroll from "react-custom-scroll";
import "./demo.css";
import { Alerta } from "./alertas/Alerta";
import { NombreCompleto } from "./Sidebar/NombreCompleto";
import { DashboardRoutes } from "../routes/DashboardRoutes";
import { Perfil } from "./perfiles/Perfil";

export const Demo = ({children}) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
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
  console.log(collapsed);
  return (
    <>
   <Layout >
  <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0, background: "#46a461", height: 50 }}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}

        <div className="nombre-alerta">
          <Space>
            <Alerta />

            <NombreCompleto nombre="picazzo" apellido="bernardino corrientes" />
          </Space>
        </div>
      </Header>
      <Layout style={{ height: "100vh",background:"#46a461" }}>
        <Sider style={{background:"#46a461"}}
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
          <div className="logoo" />
          <Menu
          style={{background:"#46a461"}}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
              Option 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
         
          </Menu>
        </Sider>

        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={state.visible}
          key={state.placement}
          className="drawer"
          width={200}
        >
          <Layout style={{ height: "100vh" }}>
            <Sider style={{background:"#46a461"}}>
              <div className="logoo" />
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} style={{background:"#46a461"}}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  nav 1
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  nav 2
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                  nav 3
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                  nav 4
                </Menu.Item>
              </Menu>
            </Sider>
          </Layout>
        </Drawer>

        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}


            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      </Layout>
    </>
  );
};
