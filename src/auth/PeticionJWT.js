import {useEffect,useState} from 'react'
import { securedBrowserCache } from 'secured-browser-storage';
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
          let ID=(id===idDB)
          let TIPO=(tipo===tipoDB)
          console.log(ID);
          console.log(TIPO);

        if(ok===true || noHay===true || ID===false || TIPO===false){logout()}
         // if( TIPO!=false){securedBrowserCache.setItem('type','Gerente')}
          //if(){ logout()}

          setTokenEstado(datosJWT.data);
        };
        cargarUsuario();
      }, []); 
      return tokenEstado
}
