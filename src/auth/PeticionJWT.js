import {useEffect,useState} from 'react'
import axiosURL from '../config/axiosURL';

export const PeticionJWT = () => {
    let tokenStorage = JSON.parse(localStorage.getItem("token"));
    const [tokenEstado, setTokenEstado] = useState({});
    console.log(tokenEstado);
   
    useEffect(() => {
        const cargarUsuario = async () => {
          let datosJWT = await axiosURL.get("/check", {
            headers: { token: tokenStorage },
          });
          setTokenEstado(datosJWT.data);
        };
        cargarUsuario();
      }, []); 
      return tokenEstado
}
