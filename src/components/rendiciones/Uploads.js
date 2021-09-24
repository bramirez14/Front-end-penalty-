import React,{useState,useContext} from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { GiPayMoney } from "react-icons/gi";
import { TiUser } from "react-icons/ti";
import PeticionGET from "../../config/PeticionGET";
import { BsFillHouseFill } from "react-icons/bs";
import { FaEnvelope, FaCheck } from "react-icons/fa";

import './css/a.css'
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent,Menu,SubMenu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { UserContext } from '../../context/UserContext';
export  const Uploads  = () => {
const [abrirCerrar, setAbrirCerrar] = useState(false)
    const collapsed=()=>setAbrirCerrar(!abrirCerrar)
    const {open} = useContext(UserContext)
    
    return (
      <ProSidebar >
      <SidebarHeader>
        {/**
         *  You can add a header for the sidebar ex: logo
         */}
         <h5>Hola Mundo</h5>
      </SidebarHeader>
      <SidebarContent>
      <Menu iconShape="square">
          <MenuItem
          icon={<BsFillHouseFill/>}
            
          >
            Home
            <Link to="/perfil" />
          </MenuItem>
          <SubMenu
            title="Usuarios"
            icon={<TiUser  />}
          >
            <MenuItem  >
              Registro de usuarios
              <Link to="/register" />
            </MenuItem>
          </SubMenu>
          
          <SubMenu
            title="Aprobaciones"
            icon={<FaCheck />}
           
          >
             <MenuItem
                
              >
                Aprobacion de Sueldo
                <Link to="/aprobacion/sueldo" />
              </MenuItem>
              <MenuItem  >
              Aprobacion de Vacaciones
              <Link to="/aprobacion/vacaciones" />
            </MenuItem>
            <MenuItem  >
              Aprobacion de Gastos
              <Link to="/aprobacion/gastos" />
            </MenuItem>
            <MenuItem
                
                >
                  Aprobacion de Sueldo
                  <Link to="/aprobacion/sueldo" />
                </MenuItem>
                <MenuItem  >
                Aprobacion de Vacaciones
                <Link to="/aprobacion/vacaciones" />
              </MenuItem>
              <MenuItem  >
                Aprobacion de Gastos
                <Link to="/aprobacion/gastos" />
              </MenuItem>
          </SubMenu>


          <SubMenu
        title="Solicitudes y Reservas"
        icon={<FaEnvelope />}
       
      >
        <MenuItem  >
          Anticipo de Sueldo
          <Link to="/sueldos" />
        </MenuItem>
        <MenuItem  >
          Anticipo de Gastos
          <Link to="/anticipo/gastos" />
        </MenuItem>
        <MenuItem  >
          Solicitud de Vacaciones
          <Link to="/vacaciones" />
        </MenuItem>
      </SubMenu>
      <SubMenu
        title="Rendiciones de Gastos"
        icon={<GiPayMoney  />}
       
      >
        <MenuItem  >
          Rendicion de Gastos
          <Link to="/gastos" />
        </MenuItem>
      </SubMenu>
          </Menu>
       
      </SidebarContent>
      <SidebarFooter>
        {/**
         *  You can add a footer for the sidebar ex: copyright
         */}
         <h5>Propieda de Intranet </h5>
      </SidebarFooter>
    </ProSidebar>
    )
  
}
