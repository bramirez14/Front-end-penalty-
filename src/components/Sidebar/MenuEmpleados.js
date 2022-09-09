import React from "react";
import { Menu, Grid } from "antd";
import {
  DollarCircleOutlined,
  HomeOutlined,
  MailOutlined,
  ReconciliationOutlined,
  RiseOutlined,
  FileDoneOutlined,

} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { filtroNumVendedores } from "../../helpers/funcioneshelpers";
const { SubMenu } = Menu;
export const MenuEmpleados = ({ open, setOpen }) => {
  const N = localStorage.getItem("N");
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  let handleClick;
  if (!screens.md) {
    handleClick = (e) => {
      setOpen(false);
    };
  }
  //submenu11
  //key = 30
  return (
    <Menu
      mode="inline"
      onClick={handleClick}
      style={{ backgroundColor: "#46a461", width: 214 }}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/perfil">Home </Link>
      </Menu.Item>
      {N !== "0000" && (
        <SubMenu key="sub3" title="Rtes de Gestion" icon={<RiseOutlined />}>
          <Menu.Item key="7">
            <Link to="/reportes/gestion/remitos">Remitos</Link>
          </Menu.Item>
          <SubMenu key="sub4" title="Facturacion">
            <Menu.Item key="8">
              <Link to="/reportes/facturacion/ventas">Por Vdor</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/reportes/facturacion/detallada">Con Detalle</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="10">
            <Link to="/reportes/cuentacorriente">Cta Cte Clientes </Link>
          </Menu.Item>
          <Menu.Item key="29">
            <Link to="/reportes/ctacte/proveedores">Cta Cte Proveedores </Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/reportes/cobranza">Cobranzas</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/reportes/clientes/inhabilitados">
              Ctes Inhabilitados{" "}
            </Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link to="/reportes/carga/pedidos">Carga de Pedidos </Link>
          </Menu.Item>
          <SubMenu key="sub5" title="Pendiente">
            <Menu.Item key="14">
              <Link to="/reportes/pendiente/detallado">Detallado</Link>
            </Menu.Item>
            <Menu.Item key="15">
              <Link to="/reportes/pendiente/cliente">Agrupado Por Cliente</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="16">
            <Link to="/reportes/futuros/ingresos">Futuros Ingresos</Link>
          </Menu.Item>
          <Menu.Item key="17">
            <Link to="/reportes/stock">Stock</Link>
          </Menu.Item>
          <Menu.Item key="18">
            <Link to="/reportes/scc">Control de SCC</Link>
          </Menu.Item>
        </SubMenu>
      )}
      <SubMenu key="sub6" title="Solicitudes" icon={<MailOutlined />}>
        <Menu.Item key="19">
          <Link to="/sueldo">Sueldo</Link>
        </Menu.Item>
        <Menu.Item key="20">
          <Link to="/vacaciones">Vacaciones</Link>
        </Menu.Item>
        <Menu.Item key="21">
          <Link to="/anticipo/gasto"> Gastos</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub7" title="Rendiciones" icon={<DollarCircleOutlined />}>
        <Menu.Item key="22">
          <Link to="/gastos"> Gasto</Link>
        </Menu.Item>
        <Menu.Item key="23">
          <Link to="/lista/kilometros">Km </Link>
        </Menu.Item>
      </SubMenu>
      {N === "907" && (
        <>
          <SubMenu
            key="sub8"
            title="Cobranzas"
            icon={<ReconciliationOutlined />}
          >
            <Menu.Item key="24">
              <Link to="/lista/recibo"> Recibo </Link>
            </Menu.Item>
            <Menu.Item key="25">
              <Link to="/aprobacion/scc"> Aprob SCC </Link>
            </Menu.Item>
          </SubMenu>
        </>
      )}

      {N === "0000" ? (
        ""
      ) : filtroNumVendedores(N) ? (
        ""
      ) : (
        <SubMenu key="sub9" title="Cobranzas" icon={<ReconciliationOutlined />}>
          <Menu.Item key="26">
            <Link to="/recibo"> Recibo provisorio </Link>
          </Menu.Item>
        </SubMenu>
      )}
      {N === "905" && (
        <SubMenu
          key="sub10"
          title="Comprobante"
          icon={<ReconciliationOutlined />}
        >
          <Menu.Item key="27">
            <Link to="/comprobantes/gastos"> gastos </Link>
          </Menu.Item>
          <Menu.Item key="28">
            <Link to="/comprobantes/tarjeta-credito"> tarjeta de credito</Link>
          </Menu.Item>
        </SubMenu>
      )}
      <SubMenu key="sub11" title="Subir Excel" icon={<FileDoneOutlined />}>
        <Menu.Item key="30">
          <Link to="/excel"> Archivo Excel</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
