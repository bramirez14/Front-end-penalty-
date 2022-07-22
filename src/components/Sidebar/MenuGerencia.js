import React from "react";
import { Menu, Grid } from "antd";
import {
    AccountBookOutlined,
  CheckOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
  HomeOutlined,
  MailOutlined,
  PayCircleOutlined,
  ReconciliationOutlined,
  RiseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

export const MenuGerencia = ({ open, setOpen }) => {
  const N = localStorage.getItem("N");
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  let handleClick;
  if (!screens.md) {
    handleClick = (e) => {
      console.log(e);
      setOpen(false);
    };
  }
//key=37
  return (
    <Menu
      mode="inline"
      onClick={handleClick}
      style={{ backgroundColor: "#46a461" }}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/perfil">Home </Link>
      </Menu.Item>
      {N === "901" && (
        <SubMenu key="sub1" title="Usuario" icon={<UserOutlined />}>
          <Menu.Item key="2">
            <Link to="/register">Registro</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/editar/usuario">Editar</Link>
          </Menu.Item>
        </SubMenu>
      )}
      <SubMenu key="sub2" title="Aprobaciones" icon={<CheckOutlined />}>
        <Menu.Item key="4">
          <Link to="/aprobacion/sueldo">Sueldo</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/aprobacion/vacaciones"> Vacaciones</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/calendario"></Link>
                Calendario
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/aprobacion/gastos"></Link>
          Gastos
        </Menu.Item>
        <Menu.Item key="8">
          <Link to="/aprobacion/km"></Link>
          Km
        </Menu.Item>
      
      </SubMenu>

      <SubMenu key="sub3" title="Rtes de Gestion" icon={<RiseOutlined />}>
        <Menu.Item key="9">
          <Link to="/reportes/gestion/remitos">Remitos</Link>
        </Menu.Item>
        <SubMenu key="sub4" title="Facturacion">
          <Menu.Item key="10">
            <Link to="/reportes/facturacion/ventas">Por Vdor</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/reportes/facturacion/detallada">Detalladata</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="12">
          <Link to="/reportes/cuentacorriente">CuentaCorriente </Link>
        </Menu.Item>
        <Menu.Item key="37">
          <Link to="/reportes/ctacte/proveedores">CtaCte Proveedores </Link>
        </Menu.Item>
        <Menu.Item key="13">
          <Link to="/reportes/cobranza">Cobranzas</Link>
        </Menu.Item>
        <Menu.Item key="14">
          <Link to="/reportes/clientes/inhabilitados">Ctes Inhabilitados </Link>
        </Menu.Item>
        <Menu.Item key="15">
          <Link to="/reportes/carga/pedidos">Carga de Pedidos </Link>
        </Menu.Item>
        <SubMenu key="sub5" title="Pendiente">
          <Menu.Item key="16">
            <Link to="/reportes/pendiente/detallado">Detallado</Link>
          </Menu.Item>
          <Menu.Item key="17">
            <Link to="/reportes/pendiente/cliente">Agrupado Por Cliente</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="18">
          <Link to="/reportes/futuros/ingresos">Futuros Ingresos</Link>
        </Menu.Item>
        <Menu.Item key="19">
          <Link to="/reportes/stock">Stock</Link>
        </Menu.Item>
        <Menu.Item key="20">
          <Link to="/reportes/scc">Control de SCC</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub6" title="Solicitudes" icon={<MailOutlined />}>
        <Menu.Item key="21">
          <Link to="/sueldo">Sueldo</Link>
        </Menu.Item>
        <Menu.Item key="22">
          <Link to="/vacaciones">Vacaciones</Link>
        </Menu.Item>
        <Menu.Item key="23">
          <Link to="/anticipo/gasto"> Gastos</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub7" title="Rendiciones" icon={<DollarCircleOutlined />}>
        <Menu.Item key="24">
          <Link to="/gastos"> Gasto</Link>
        </Menu.Item>
        <Menu.Item key="25">
          <Link to="/lista/kilometros">Km </Link>
        </Menu.Item>
        <Menu.Item key="26">
          <Link to="/tarjeta/credito"> Gasto con Tarjeta</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub8" title="Comprobante" icon={<FileDoneOutlined />}>
        <Menu.Item key="27">
          <Link to="/comprobantes/gastos"> gastos</Link>
        </Menu.Item>
        <Menu.Item key="28">
          <Link to="/comprobantes/tarjeta-credito"> tarjeta de credito </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub9" title="Cobranzas" icon={<ReconciliationOutlined />}>
      <Menu.Item key="29">
          <Link to="/aprobacion/scc"> Aprob SCC </Link>
        </Menu.Item>
        <Menu.Item key="30">
          <Link to="/recibo"> Recibo provisorio </Link>
        </Menu.Item>
        <Menu.Item key="31">
          <Link to="/lista/recibo"> Recibo </Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub10" title="orden de pago" icon={ <AccountBookOutlined />}>
    
        <Menu.Item key="32">
          <Link to="/vista/rendicion/gasto"> gastos </Link>
        </Menu.Item>
        <Menu.Item key="33">
          <Link to="/vista/rendicion/km"> km</Link>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub11" title="pago" icon={<PayCircleOutlined />}>
      <Menu.Item key="34">
          <Link to="/pagos/anticipo"> sueldos </Link>
        </Menu.Item>
        <Menu.Item key="35">
          <Link to="/pagos/gasto"> gastos </Link>
        </Menu.Item>
        <Menu.Item key="36">
          <Link to="/pagos/km"> km</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
