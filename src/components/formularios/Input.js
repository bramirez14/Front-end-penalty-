import React from "react";
import "./css/input.css";
export const Input = ({ handleChange,name,placeholder,type }) => {
  return (
    <>
      <div className="input-group">
        <input
          className='texto'
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
