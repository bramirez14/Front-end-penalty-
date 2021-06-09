import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu  } from 'react-pro-sidebar';
import { FaEnvelope, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiPayMoney } from "react-icons/gi";
import { TiUser } from "react-icons/ti";
import { BsFillHouseFill } from "react-icons/bs";
export const Item902 = ({ click, click2,q }) => {
    return (
        <>
          <Menu>
            <SubMenu
              title="Aprobaciones"
              icon={<FaCheck />}
              
            >
              <MenuItem
                onClick={q ? click : click2}
                
              >
                Aprobacion de Sueldo
                <Link to="/aprobacion/sueldo" />
              </MenuItem>
              <MenuItem onClick={q ? click : click2} >
              Aprobacion de Vacaciones
              <Link to="/aprobacion/vacaciones" />
            </MenuItem>
            <MenuItem onClick={q ? click : click2} >
              Aprobacion de Gastos
              <Link to="/aprobacion/gastos" />
            </MenuItem>
            </SubMenu>
            </Menu>
          </>
        
            
        
    )
}
