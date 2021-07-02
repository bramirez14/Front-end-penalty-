import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/sidebar.css'

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div className='link' /* to={item.path}  */onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <label className='label'>{item.title}</label>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </div>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <div className='dropdownLink' /* to={item.path} */ key={index}>
              {item.icon}
              <label className='label'>{item.title}</label>
            </div>
          );
        })}
    </>
  );
};

export default SubMenu;
