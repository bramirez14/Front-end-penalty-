import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/subMenu.css'

const SubMenu = ({ open,setOpen,item, }) => {
  const [subnav, setSubnav] = useState(false);
  const [cambioColor, setCambioColor] = useState(false);
  var mediaqueryList = window.matchMedia("(max-width: 768px)");
  const q= mediaqueryList.matches
  const showSubnav = () => {
    setCambioColor(!cambioColor)
    setSubnav(!subnav);
    
  }
  let abrirCerrar;
  if(q){
    abrirCerrar=() =>{
    setOpen(!open)
    setSubnav(!subnav);
  }
  }
 
  return (
    <>
    <div>
    <Link to={item?.path}>
      <div className={cambioColor?'color' : 'link' }onClick={item?.subNav ? showSubnav: abrirCerrar}>
        <div>
          {item.icon}
          <span className='label'>{item.title}</span>
        </div>
        <div >
          {item?.subNav && subnav
            ? item?.iconOpened
            : item?.subNav
            ? item?.iconClosed
            : null}
        </div>
      </div>
      </Link>
      </div>
      {subnav &&
        item.subNav?.map((item, index) => {
          return (
            <Link to={item?.path} >
            <div className='dropdownLink' key={index}>
              {item.icon}
              <label className='label'  onClick={q?abrirCerrar:() => {setSubnav(!subnav);}} >{item.title}</label>
            </div>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
