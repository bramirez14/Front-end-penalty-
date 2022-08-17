import React from "react";
import { Menu, Dropdown, Space } from "antd";
import { UserOutlined, SettingOutlined,PlusOutlined } from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
import { ImExit } from "react-icons/im";
import { IoCarSportSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./css/drop.css";

export const NombreCompleto = ({ handleLogout, nombre, apellido  }) => {
  const N = localStorage.getItem('N')
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined style={{ fontSize: 17 }} />}
        style={{ fontSize: "20px" }}
      >
        <Link to="/estado/usuario">
          
          <span style={{ marginLeft: "5px" }}>Estado del Usuario</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<SettingOutlined style={{ fontSize: "20px" }} />}
        style={{ fontSize: "20px" }}
      >
        <Link to="/configuraciones/cambiar/contrasena">
          
          <span style={{ marginLeft: "10px" }}> Configuracion </span>
        </Link>
      </Menu.Item>

      { (N==='901'|| N==='902') && 
      <>
      <Menu.Item
        key="4"
        icon={<IoCarSportSharp/>}
        style={{ fontSize: "20px" }}
        
      >
         <Link to="/precio/km" style={{color:'black'}}>
         <span style={{ marginLeft: "10px" }}> Precio de KM </span>
         </Link>
      
      </Menu.Item>
      
<Menu.Item
        key="5"
        icon={<PlusOutlined />}
        style={{ fontSize: "20px" }}
        
      >
         <Link to="/alta/medios/pagos" style={{color:'black'}}>
         <span style={{ marginLeft: "10px" }}> Agregar Medio de Pago</span>
         </Link>
      
      </Menu.Item>
      </>
      }

      <Menu.Item
        key="3"
        icon={<ImExit />}
        style={{ fontSize: "20px" }}
        onClick={handleLogout}
      >
        <span style={{ marginLeft: "10px" }}> Salir</span>
      </Menu.Item>
     
    </Menu>
  );
  return (
    <Space wrap>
      <Dropdown overlay={menu} className="drop" trigger={['click']}>
        <div>
          {nombre} {apellido} <CaretDownOutlined />
        </div>
      </Dropdown>
    </Space>
  );
};
