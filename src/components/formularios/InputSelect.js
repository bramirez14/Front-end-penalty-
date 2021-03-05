import React, { useState } from "react";
import { FaHandHoldingUsd, FaAngleDown } from "react-icons/fa";
import "./css/inputSelect.css";
export const InputSelect = () => {
  const [open, setOpen] = useState(false);
  const [user, setUsers] = useState("Seleccion");
  const handleClik = () => {
    open === true ? setOpen(false) : setOpen(true);
  };
  const hadleSelectClick = (e) => {
    console.log(e.target.value);
    setUsers(e.target.value);
    setOpen(false);
  };

  console.log(open);
  return (
    <>
      {!open ? (
        <div className="selected" onClick={handleClik}>
          <label className="label-icono">
            <FaHandHoldingUsd className="icono" />
          </label>

          <div className="seleccion">{user}</div>

          <div>
            <FaAngleDown className="flecha" />
          </div>
        </div>
      ) : (
        <div className="selected" onClick={handleClik} style={{backgroundColor:'#f6fffa', border:'solid 1px #f6fffa'}}>
          <label className="label-icono" style={{ background: "#8af5c1" }}>
            <FaHandHoldingUsd className="icono" style={{ color: "white" }}  />
          </label>

          <div className="seleccion">{user}</div>

          <div>
            <FaAngleDown className="flecha"  style={{ transform: "rotateX(180deg)" }}/>
          </div>
        </div>
      )}

      {open === true && (
        <div className="select-box">
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>

          <option
            className="option"
            defaultValue="oo"
            onClick={hadleSelectClick}
          >
            oo
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
          <option
            className="option"
            htmlFor="automobiles"
            defultValue=" ok"
            onClick={hadleSelectClick}
          >
            Automobiles
          </option>
        </div>
      )}
    </>
  );
};
