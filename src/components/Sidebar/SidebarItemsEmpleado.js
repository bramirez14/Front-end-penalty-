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

export const SidebarItemsEmpleado = [
  {
    title: "Home",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
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
    title: "Rendiciones",
    icon: <GiPayMoney />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Gasto",
        path: "/gastos",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "R. Gestion",
    icon: <MdTrendingUp />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Remitos",
        path: "/reportes/gestion/remitos",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];
