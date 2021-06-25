import {useEffect,useState,useContext} from 'react'
import axiosURL from '../config/axiosURL';
import { UserContext } from '../contexto/UserContext';
import { logout } from './localStorage';

export const PeticionJWT = () => {
  const contex = useContext(UserContext)
  
    let tokenStorage = (localStorage.getItem("token"));
 
    let id= (localStorage.getItem("uid"));
 
    let tipo= (localStorage.getItem("type"));
    
    let N = localStorage.getItem('N')

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
          let Numvend=(datosJWT.data.nvendedor===N)
          if(ID===false){logout(); contex?.setAuth(false)}
        if(ok===true || noHay===true  || TIPO===false || Numvend===false){logout(); contex?.setAuth(false)}
          setTokenEstado(datosJWT.data);
         contex?.setAuth(true)
        };
        cargarUsuario();
      }, [N, contex, id, tipo, tokenStorage]); 
      return tokenEstado
}
