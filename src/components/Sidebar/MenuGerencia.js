import { CheckOutlined, DollarOutlined, HomeOutlined, MailOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React from 'react'
import CustomScroll from "react-custom-scroll";
import './css/menu.css'
export const MenuGerencia = () => {
    const handleClick = e => {
        console.log('click ', e);
      };
    return (
        <CustomScroll heightRelativeToParent="calc(80% - 100px)"> 

        <Menu
        style={{background:"#46a461",width:245}}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
          onClick={handleClick}
        >
           <Menu.Item key="1" icon={ <HomeOutlined />} className='submenu' style={{background:"#46a461"}}>
              Home
            </Menu.Item>

        <SubMenu key="sub1" icon={<UserOutlined />} title="Usuario" className='submenu'>
            <Menu.Item  key="2" className='subItem'>Registro</Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<CheckOutlined/>} title="Aprobaciones" className='submenu'>
        <Menu.Item key="3" className='subItem'> Sueldo</Menu.Item>
            <Menu.Item key="4"  className='subItem'>Vacaciones</Menu.Item>
            <Menu.Item key="5"  className='subItem'>Gasto</Menu.Item>
            <Menu.Item key="6"  className='subItem'>km</Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" icon={<RiseOutlined />} title="Reportes de Gestion" className='submenu'>
          <Menu.Item key="7" className='subItem'>Remito</Menu.Item>
          <Menu.Item key="8" className='subItem'>Facturacion por Vendedor</Menu.Item>
          <Menu.Item key="9" className='subItem'>Cuenta Corriente</Menu.Item>
          <Menu.Item key="10" className='subItem'>Clientes Inhabilitados</Menu.Item>
          <Menu.Item key="11" className='subItem'>Control Carga de Pedidos</Menu.Item>
          <Menu.Item key="12" className='subItem'>Pendiente Detallado</Menu.Item>
          <Menu.Item key="13" className='subItem'>Pendiente Agrupado por Cliente</Menu.Item>
          <Menu.Item key="14" className='subItem'>Futuros Ingresos</Menu.Item>
          <Menu.Item key="15" className='subItem'>Stock</Menu.Item>
          <Menu.Item key="16" className='subItem'>Control de SCC</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<MailOutlined />} title="Solicitudes" className='submenu'>
        <Menu.Item key="3">Sueldo</Menu.Item>
            <Menu.Item key="17" className='subItem'>Vacaciones</Menu.Item>
            <Menu.Item key="18" className='subItem'>Gasto</Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<DollarOutlined />} title="Rendiciones" className='submenu'>
            <Menu.Item key="20" className='subItem'>Gasto</Menu.Item>
            <Menu.Item key="21" className='subItem'>km</Menu.Item>
        </SubMenu>

        </Menu>
        </CustomScroll>

    )
}
