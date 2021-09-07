import {
  DollarOutlined,
  HomeOutlined,
  MailOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import CustomScroll from "react-custom-scroll";
import { Link } from "react-router-dom";
import "./css/menu.css";

export const MenuEmpleados = () => {
  const handleClick = (e) => {
    console.log("click ", e);
  };
  return (
    <CustomScroll heightRelativeToParent="calc(80% - 100px)">
      <Menu
        className="contenedor-menu"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        onClick={handleClick}
      >
        <Menu.Item
          key="1"
          className="submenu"
          style={{ background: "#46a461" }}
        >
          <Link className='menu-link' to="/perfil">
            <span><HomeOutlined /> <span>Home</span></span></Link>
        </Menu.Item>

        <SubMenu
          key="sub3"
          icon={<RiseOutlined />}
          title="Reportes de Gestion"
          className="submenu"
        >
          <Menu.Item key="7" className="subItem">
            <Link to="/reportes/gestion/remitos">Remito</Link>
          </Menu.Item>
          <Menu.Item key="8" className="subItem">
            <Link to="/reportes/facturacion/ventas">Facturacion por Vdor</Link>
          </Menu.Item>
          <Menu.Item key="9" className="subItem">
            <Link to="/reportes/facturacion/detallada">
              Facturacion Detalladata
            </Link>
          </Menu.Item>
          <Menu.Item key="10" className="subItem">
            <Link to="/reportes/cuentacorriente">Cuenta Corriente</Link>
          </Menu.Item>

          <Menu.Item key="11" className="subItem">
            <Link to="/reportes/cobranza">Cobranzas</Link>
          </Menu.Item>
          <Menu.Item key="12" className="subItem">
            <Link to="/reportes/clientes/inhabilitados">
              Clientes Inhabilitados
            </Link>
          </Menu.Item>
          <Menu.Item key="13" className="subItem">
            <Link to="/reportes/carga/pedidos">Ctrol Carga de Pedidos</Link>
          </Menu.Item>
          <Menu.Item key="14" className="subItem">
            <Link to="/reportes/pendiente/detallado">Pendiente Detallado</Link>
          </Menu.Item>
          <Menu.Item key="15" className="subItem">
            <Link to="/reportes/pendiente/cliente"> Pte Agrupado por Cte</Link>
          </Menu.Item>
          <Menu.Item key="16" className="subItem">
            <Link to="/reportes/futuros/ingresos"> Futuros Ingresos</Link>
          </Menu.Item>
          <Menu.Item key="17" className="subItem">
            <Link to="/reportes/stock">Stock</Link>
          </Menu.Item>
          <Menu.Item key="18" className="subItem">
            <Link to="/reportes/scc">Control de SCC</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub4"
          icon={<MailOutlined />}
          title="Solicitudes"
          className="submenu"
        >
          <Menu.Item key="19" className="subItem">
            <Link to="/sueldos"> Sueldo</Link>
          </Menu.Item>
          <Menu.Item key="20" className="subItem">
            <Link to="/vacaciones">Vacaciones</Link>
          </Menu.Item>
          <Menu.Item key="21" className="subItem">
            <Link to="/anticipo/gastos">Gasto</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub5"
          icon={<DollarOutlined />}
          title="Rendiciones"
          className="submenu"
        >
          <Menu.Item key="22" className="subItem">
            <Link to="/gastos">Gasto</Link>
          </Menu.Item>
          <Menu.Item key="23" className="subItem">
            <Link to="/lista/kilometros">km</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </CustomScroll>
  );
};
