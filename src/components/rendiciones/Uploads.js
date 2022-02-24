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
//import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent,Menu,SubMenu, MenuItem} from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/css/styles.css';
import { UserContext } from '../../context/UserContext';
export  const Uploads  = () => {
const [abrirCerrar, setAbrirCerrar] = useState(false)
    const collapsed=()=>setAbrirCerrar(!abrirCerrar)
    const {open} = useContext(UserContext)
    
    return (
     <>
     </>
    )
  
}
