import React,{useContext} from 'react'
import { Button } from 'antd'
import { logout } from '../../auth/localStorage'
import { PerfilCristianAdmin } from './PerfilCristianAdmin'
import { PerfilEmpleado } from './PerfilEmpleado'
import { UserContext } from '../../contexto/UserContext'

export const Perfil = ({history}) => {
    const Text = useContext(UserContext);
    const { open } = Text;
    const tipo = localStorage.getItem('type')
    const handleLogout = () => {
        logout();
        history.push("/login");
      };
    return (
        <div className={!open ? "contenedor" : "contenedor-active"}>
        {tipo==='Gerente'?
       <PerfilCristianAdmin/>

       :
       <PerfilEmpleado/>
        }
         <Button onClick={handleLogout}>Salir</Button>
            
        </div>
    )
}
