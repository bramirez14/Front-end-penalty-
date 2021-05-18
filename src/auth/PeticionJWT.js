import {useEffect,useState} from 'react'
import axiosURL from '../config/axiosURL';
import { logout } from './localStorage';

export const PeticionJWT = () => {
    let tokenStorage = (localStorage.getItem("token"));
 
    let id= (localStorage.getItem("uid"));
 
    let tipo= (localStorage.getItem("type"));

    const [tokenEstado, setTokenEstado] = useState({});

    useEffect(() => {
        const cargarUsuario = async () => {
          let datosJWT = await axiosURL.get("/check", {
            headers: { token: tokenStorage },
          });
          let idDB=datosJWT.data.id
          let tipoDB=datosJWT.data.tipousuario;
          let ok= (datosJWT.data==='Token invalido');
          let noHay=(datosJWT.data==='No hay token')
          let ID=(id===idDB?.toString())
          let TIPO=(tipo===tipoDB)
          if(ID===false){logout()}
        if(ok===true || noHay===true  || TIPO===false){logout()}
          setTokenEstado(datosJWT.data);
        };
        cargarUsuario();
      }, []); 
      return tokenEstado
}
