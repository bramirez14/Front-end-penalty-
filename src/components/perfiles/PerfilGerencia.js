import React, {  useContext,useEffect  } from "react";
import "./css/perfiles.css";
import axios from "axios";
/* import bcryptjs from "bcryptjs";*/
import { Tarjetas } from "./Tarjetas";
import { ListaUsuarios } from "./ListaUsuarios";
import { UserContext } from "../../contexto/UserContext";

export const PerfilGerencia = ({ history }) => {
  const { arrayUsuarios } = useContext(UserContext)
  const peticion=async()=>{
    let rep= await axios.get('http://localhost:4000/api/reportes/remitos');
    console.log(rep);
   }
   useEffect(() => {
     peticion();
   }, [])
  return (
    <>
      <div className='contenedore'>
        <Tarjetas />
        {/**Lista */}
        <ListaUsuarios
          lista={arrayUsuarios}
        />

      </div>

    </>
  );
};
