import React, {  useContext,useEffect  } from "react";
import "./css/perfiles.css";
/* import bcryptjs from "bcryptjs";*/
import { Tarjetas } from "./Tarjetas";
import { ListaUsuarios } from "./ListaUsuarios";
export const PerfilGerencia = ({ history,usuarios}) => {
return (
    <>
      <div className='contenedore'>
        <Tarjetas />
        {/**Lista */}
        <ListaUsuarios
          lista={usuarios}
        />
      </div>
    </>
  );
};
