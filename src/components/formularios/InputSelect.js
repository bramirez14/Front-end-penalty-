import React, { useState } from "react";
import { FaHandHoldingUsd, FaAngleDown } from "react-icons/fa";
import "./css/inputSelect.css";
export const InputSelect = ({
  bottom,
  left,
  titulo,
  icono,
  click,
  array,
  open,
  setOpen
  
}) => {
  const handleClick = () => {
    open === true ? setOpen(false) : setOpen(true);
  };
 
 
  
  return (
    <>
      {!open ? (
        <div className="selected" onClick={handleClick}>
          <label className="label-icono">
            <div className="icono" style={{ bottom: bottom, left: left }}>
              {" "}
              {icono}{" "}
            </div>
          </label>

          <div className="seleccion">{titulo}</div>

          <div>
            <FaAngleDown className="flecha" />
          </div>
        </div>
      ) : (
        <div
          className="selected"
          style={{ background: "rgba(87, 235, 163, 0.1)", border: "none" }}
          onClick={handleClick}
        >
          <label className="label-icono" style={{ background: "#8af5c1" }}>
            <div
              className="icono"
              style={{ bottom: bottom, left: left, color: "white" }}
            >
              {icono}{" "}
            </div>
          </label>

          <div className="seleccion">{titulo}</div>

          <div>
            <FaAngleDown
              className="flecha"
              style={{ transform: "rotateX(180deg)" }}
            />
          </div>
        </div>
      )}
      {open === true && <div className='contenedor-option' onClick={click} >
       
       { open === true &&
         array.map((list) => (
           <option
             className="option"
             key={list.id}
             value={list.id}
            
           >
             {list.nombre}
           </option
           
           >
         ))     }
     </div>}
      
    </>
  );
};
