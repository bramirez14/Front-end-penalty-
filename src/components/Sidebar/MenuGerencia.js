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
      setOpen(false);
    };
  }
  //submenu12
  //key = 38
  //saque key 3
  const role = localStorage.getItem("role");
  console.log(role==='admin');
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <Menu
      mode="inline"
      onClick={handleClick}
      style={{ backgroundColor: "#46a461" }}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/perfil">Home </Link>
      </Menu.Item>
{/* USUARIOS  */}
      {role === "admin" && (
        <SubMenu key="sub1" title="Usuario" icon={<UserOutlined />}>
          <Menu.Item key="2">
            <Link to="/lista/usuarios">Lista de Empleados</Link>
          </Menu.Item>
        </SubMenu>
      )}
      {/* FIN DE USUARIOS  */}
{/* APROBACIONES */}
      {(role === "admin" ||
        role === "super") && (
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
        )}
        {/* FIN DE APROBACIONES */}
{/* REPORTES DE GESTION */}
      <SubMenu key="sub3" title="Rtes de Gestion" icon={<RiseOutlined />}>
        <Menu.Item key="9">
          <Link to="/reportes/gestion/remitos">Remitos</Link>
        </Menu.Item>
        <SubMenu key="sub4" title="Facturacion">
          <Menu.Item key="10">
            <Link to="/reportes/facturacion/ventas">Por Vdor</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/reportes/facturacion/detallada">Con Detalle</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="12">
          <Link to="/reportes/cuentacorriente">Cta Cte Clientes </Link>
        </Menu.Item>
        <Menu.Item key="37">
          <Link to="/reportes/ctacte/proveedores">Cta Cte Proveedores </Link>
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
{/* FIN DE REPORTES DE GESTION */}


{/* SOLICITUDES */}
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
{/* FIN DE SOLICITUDES */}
      {
        /* COMPROBANTES */
        (role === "admin" ||
          role === "super" ||
          permissions.includes("Comprobantes")) && (
          <SubMenu key="sub8" title="Comprobante" icon={<FileDoneOutlined />}>
            <Menu.Item key="27">
              <Link to="/comprobantes/gastos"> Gastos</Link>
            </Menu.Item>
            <Menu.Item key="28">
              <Link to="/comprobantes/tarjeta-credito">
                {" "}
                Tarjeta de credito{" "}
              </Link>
            </Menu.Item>
          </SubMenu>
        )
      }
      {/* FIN DE COMPROBANTES */}
      {
        /* COBRANZAS*/
        (role === "admin" ||
          role === "super" ||
          permissions.includes("Cobranzas")) && (
          <SubMenu
            key="sub9"
            title="Cobranzas"
            icon={<ReconciliationOutlined />}
          >
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
        )
        /* FIN DE COBRANZAS */
      }
     {/* DEPOSITO */
       (role === "admin" ||
       role === "super" ||
       permissions.includes("Deposito"))&&
      <SubMenu key="sub12" title="Deposito" icon={<FileDoneOutlined />}>
        <Menu.Item key="38">
          <Link to="/excel">Archivos Entregas </Link>
        </Menu.Item>
      </SubMenu>
      /* FIN DE DEPOSITO */
      }
      {
        /*Orden de pago  */
        (role === "admin" ||
          role === "super" ||
          permissions.includes("Orden de Pago")) && (
          <SubMenu
            key="sub10"
            title="Orden de pago"
            icon={<AccountBookOutlined />}
          >
            <Menu.Item key="32">
              <Link to="/vista/rendicion/gasto"> Gastos </Link>
            </Menu.Item>
            <Menu.Item key="33">
              <Link to="/vista/rendicion/km"> Km</Link>
            </Menu.Item>
          </SubMenu>
        )
      }
      {
        /*Pago */
        role === "admin" ||
          role === "super" ||
          (permissions.includes("Pago") && (
            <SubMenu key="sub11" title="pago" icon={<PayCircleOutlined />}>
              <Menu.Item key="34">
                <Link to="/pagos/anticipo"> Sueldos </Link>
              </Menu.Item>
              <Menu.Item key="35">
                <Link to="/pagos/gasto"> Gastos </Link>
              </Menu.Item>
              <Menu.Item key="36">
                <Link to="/pagos/km"> Km</Link>
              </Menu.Item>
            </SubMenu>
          ))
      }
    </Menu>
  );
};
