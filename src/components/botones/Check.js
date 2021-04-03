import React from "react";
import "./check.css";
export const Check = ({ value, change, name }) => {
  return (
    <>
      <div className="contenedor-check">
        <input type="radio" name={name} value={value} onChange={change} />
        <label className="label-check" htmlFor={value}>
          {value}
        </label>
      </div>
    </>
  );
};
