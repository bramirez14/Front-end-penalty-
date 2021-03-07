import React, { useState } from "react";

import "./css/inputIcon.css";
export const InputIcon = ({
  name,
  placeholder,
  change,
  icono,
  open,
  setOpen,
  type,
}) => {
  const handleClick = () => {
    setOpen(true);
  };
  const handleClock = () => {
    setOpen(false);
  };
  console.log(!!open);
  return (
    <>
      {!!open ? (
        <div
          className="contenedor-input"
          onMouseOver={handleClick}
          onMouseOut={handleClock}
        >
          <div>
            <label
              className="icono-label"
              style={{ background: "rgb(138, 245, 193)" }}
              htmlFor="icono"
            >
              <div className="icono-importe" style={{ color: "white" }}>
                {icono}
              </div>
            </label>
          </div>

          <input
            className="importe"
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={change}
          />
        </div>
      ) : (
        <div
          className="contenedor-input"
          onMouseOver={handleClick}
          onMouseOut={handleClock}
        >
          <div>
            <label className="icono-label" htmlFor="icono">
              <div className="icono-importe">{icono}</div>
            </label>
          </div>

          <input
            className="importe"
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={change}
          />
        </div>
      )}
    </>
  );
};
