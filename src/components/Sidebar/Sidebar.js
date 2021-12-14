import React, { useState, useContext } from "react";
import { Row, Col,Avatar, Drawer, Grid, Layout, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/UserContext";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { axiosURL } from "../../config/axiosURL";
import { logout } from "../../auth/localStorage";
import { BotomHamburguesa } from "../botones/BotomHamburguesa";
import { NombreCompleto } from "./NombreCompleto";
import { Alerta } from "../alertas/Alerta";
import { MenuGerencia } from "./MenuGerencia";
import { MenuEmpleados } from "./MenuEmpleados";
import { PeticionGET } from "../../config/PeticionGET";
import { menuEmail } from "./menuEmail";
import { useNavigate } from "react-router";
import CustomScroll from "react-custom-scroll";
import "./css/sidebar.css";
const { Sider } = Layout;
const { useBreakpoint } = Grid;


export const Sidebar = ({  alertas, setAlertas, getAlertas }) => {
  const navigate=useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const abrirCerrarHamburguesa = () => setOpen(!open);
  const id = localStorage.getItem("uid");
  const datos = PeticionGET(`/${id}`);
  const N = localStorage.getItem("N");
  const Sidebar = useContext(UserContext);
  const { open, setOpen } = Sidebar;
  const get = PeticionJWT();
  const { nombre, apellido } = get;

  const handleLogout = async () => {
    await axiosURL.put(`/cs/${id}`, { conectado: "NO" });
    logout();
    navigate("/login");
    setOpen(false);
  };

  const onClose = () => setOpen(!open);
  const screens = useBreakpoint();
  return (
    <>
      <Row>
        <Col>
          <div className="navbar">
            <div className="hamburguesa">
              
              <BotomHamburguesa
                abrirCerrarHamburguesa={abrirCerrarHamburguesa}
              />
            </div>
            <div className="nomaler" style={{ display: "flex" }}>
              <div className="alerta">
                <Alerta
                  alertas={alertas}
                  setAlertas={setAlertas}
                  getAlertas={getAlertas}
                />
              </div>
              <div className="nombreCompleto">
                <NombreCompleto
                  nombre={nombre}
                  apellido={apellido}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {open === false ? (
        ""
      ) : (
        <Drawer
          placement={"left"}
          closable={false}
          onClose={onClose}
          visible={true}
          key={"left"}
          mask={screens.lg ? false : true}
          width={227}
          height="100vh"
          push={{ distance: 400 }}
        >
          <Layout>
            <Sider
              className="sider"
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                backgroundColor: "#46a461",
              }}
              width={227}
            >
              {/*   <AvatarImg history={history} /> */}
              <div
                className="loggo"
                style={{
                  padding: 10,
                  backgroundColor: "#46a461",
                  borderBottom: "solid 1px #ffff",
                  width: 227,
                }}
              >
                <Avatar size={64} src={datos.imagen} />
                <h4 style={{ color: "#ffff" }}>
                  <b>
                    {datos.nombre}
                    {datos.apellido}
                  </b>
                </h4>
                <Dropdown overlay={menuEmail}>
                  <div style={{display:'flex',flexWrap:'nowrap'}}>
                  <h5
                    style={{
                      width: 200,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      color: "#ffff",
                      textOverflow: "ellipsisps",
                    }}
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {datos.email}
                  </h5>
                  <DownOutlined style={{marginTop:5,marginLeft:7,color:'#ffff'}}/></div>
                </Dropdown>
              </div>
              <CustomScroll heightRelativeToParent="calc(87% - 100px)">
                {/* <div }> */}
                {N === "901" || N === "902" || N === "903" ? (
                  <MenuGerencia open={open} setOpen={setOpen} />
                ) : (
                  <MenuEmpleados open={open} setOpen={setOpen} />
                )}
              </CustomScroll>
            </Sider>
          </Layout>
        </Drawer>
      )}
    </>
  );
};
