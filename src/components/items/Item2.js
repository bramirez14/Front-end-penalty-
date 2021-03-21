import React from 'react'
import { ProSidebar,SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { BsFillAlarmFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
export const Item2 = () => {
    return (
        <ProSidebar >
  <Menu  >

<SubMenu title="Solicitudes y Reservas" icon={<BsFillAlarmFill/>} style={{fontSize:'18px', color:'white'}}>

<MenuItem >
Anticipo de Sueldo
<Link to="/penalty/sueldos"/>
</MenuItem>
<MenuItem >
Solicitud de Vacaciones
<Link to="/penalty/vacaciones"/>
</MenuItem>

</SubMenu>







</Menu>


</ProSidebar>
    )
}
