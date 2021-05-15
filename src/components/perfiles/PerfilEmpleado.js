import { Button } from 'antd'
import React, { useContext } from 'react'
import { logout } from '../../auth/localStorage'
import { PeticionJWT } from '../../auth/PeticionJWT'
import { UserContext } from '../../contexto/UserContext'
import './css/perfiles.css'

export const PerfilEmpleado = ({history}) => {
    const tipo = localStorage.getItem('type')
    const Text = useContext(UserContext);
    const { open } = Text;
    let { nombre, apellido } = PeticionJWT();
    const genero = () => (tipo === 'Empleada') ? 
    <h1>Bienvenida {nombre} {apellido} </h1> : 
    <h1> Bienvenido {nombre}{apellido}</h1>
    const handleLogout = () => {
        logout();
        history.push("/login");
      };
    return (
        <div className={!open ? "contenedor" : "contenedor-active"}>
               {genero()}
               <Button onClick={handleLogout}>Salir</Button>
        </div>

    )
}
