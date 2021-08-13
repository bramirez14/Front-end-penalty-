import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { FaEnvelope, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { TiUser } from "react-icons/ti";
import { MdTrendingUp } from "react-icons/md";

export const SidebarItems = [
  {
    title: "Home",
    path: "/perfil",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Usuario",
    icon: <TiUser />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Registro",
        path: "/register",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Aprobaciones",
    icon: <FaCheck />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Sueldo",
        path: "/aprobacion/sueldo",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Vacaciones",
        path: "/aprobacion/vacaciones",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },

      {
        title: "Gastos",
        path: "/aprobacion/gastos",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Reporte de Gestion",
    icon: <MdTrendingUp />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Remitos",
        path: "/reportes/gestion/remitos",
        icon: <IoIcons.IoIosPaper />,
      },
       {
        title: "Facturacion por Vendedor",
        path: "/reportes/facturacion/ventas",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Facturacion Detallada",
        path: "/reportes/facturacion/detallada",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Cuenta Corriente",
        path: "/reportes/cuentacorriente",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Cobranzas",
        path: "/reportes/cobranza",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Clientes Inhabilitados",
        path: "/reportes/clientes/inhabilitados",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Control Carga de Pedidos",
        path: "/reportes/carga/pedidos",
        icon: <IoIcons.IoIosPaper />,
      },  {
        title: "pendiente Detallado",
        path: "/reportes/pendiente/detallado",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Pendiente Agrupado por Cliente",
        path: "/reportes/pendiente/cliente",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Futuros Ingresos",
        path: "/reportes/futuros/ingresos",
        icon: <IoIcons.IoIosPaper />,
      }, 
       {
        title: "Stock",
        path: "/reportes/stock",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Control de SCC",
        path: "/reportes/scc",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Solicitudes",
    icon: <FaEnvelope />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Sueldo",
        path: "/sueldos",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Vacaciones",
        path: "/vacaciones",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Gastos",
        path: "/anticipo/gastos",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Rendicion",
    icon: <GiPayMoney />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Gasto",
        path: "/gastos",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Km",
        path: "/lista/kilometros",
        icon: <IoIcons.IoIosPaper />,
      }
    ],
  },
];
