import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/subMenu.css'

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
    <Link to='/perfil'>
      <div className='link' onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <span className='label'>{item.title}</span>
        </div>
        <div>
          {item?.subNav && subnav
            ? item?.iconOpened
            : item?.subNav
            ? item?.iconClosed
            : null}
        </div>
      </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link to={item?.path} >
            <div className='dropdownLink'  key={index}>
              {item.icon}
              <label className='label' onClick={showSubnav}>{item.title}</label>
            </div>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
