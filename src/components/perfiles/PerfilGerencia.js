import React, {  useContext,useEffect  } from "react";
import "./css/perfiles.css";
/* import bcryptjs from "bcryptjs";*/
import { Tarjetas } from "./Tarjetas";
import { ListaUsuarios } from "./ListaUsuarios";
import { UserContext } from "../../contexto/UserContext";
export const PerfilGerencia = ({ history,datos }) => {
  const { arrayUsuarios } = useContext(UserContext)

return (
    <>
      <div className='contenedore'>
        <Tarjetas />
        {/**Lista */}
        <ListaUsuarios
          lista={datos}
        />
      </div>
    </>
  );
};
