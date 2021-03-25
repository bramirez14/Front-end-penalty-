import React, { useState } from "react";
import { FaHandHoldingUsd, FaAngleDown } from "react-icons/fa";
import "./select.css";

export const Select = ({ bottom,
  left,
  titulo,
  icono,
  click,
  array,
  width,
  widthSelect,
  height,
  name
 
  
  }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    open === true ? setOpen(false) : setOpen(true);
  };


  return (
    <>
     
        <div role='listbox' className='selected' style={{width:widthSelect}} onClick={handleClick} >
          

          <div className="seleccion">{titulo}</div>

          <div>
            <FaAngleDown className={open?'flecha':'flecha-active'}/>
          </div>
        </div>
      
        { 
        
        <div className={!!open?'contenedor-option-active':'contenedor-option'} style={{width:width,height:height}}onClick={click}  >
      
       { open &&
         array.map((list) => (
           <option
             className="option"
             key={list.id}
             value={list.id}
             name={name}
             onClick={handleClick}
           >
             {list.nombre}
           </option
           
           >
         ))     }
     </div>}
      




    </>
  );
  
};
