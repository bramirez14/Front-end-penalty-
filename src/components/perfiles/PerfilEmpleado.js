import { PeticionJWT } from '../../auth/PeticionJWT'
import './css/perfiles.css'
import {TarjetaEmpleado} from './TarjetaEmpleado'
export const PerfilEmpleado = ({history}) => {
    const tipo = localStorage.getItem('type')
    let { nombre, apellido } = PeticionJWT();
    const genero = () => (tipo === 'Empleada') ? 
    <h1>Bienvenida {nombre} {apellido} </h1> : 
    <h1> Bienvenido {nombre}{apellido}</h1>
  
    return (
        <>
      <div className='contenedore'>
               <TarjetaEmpleado/>
               </div>
         </>   
    )
}
