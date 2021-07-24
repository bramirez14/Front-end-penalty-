import { PeticionJWT } from '../../auth/PeticionJWT'
import './css/perfiles.css'
import { TarjetaEmpleado0000 } from './TarjetaEmpleado0000'
import {TarjetaEmpleado905} from './TarjetaEmpleado905'
import { TarjetaEmpleado906 } from './TarjetaEmpleado906'
export const PerfilEmpleado = ({history}) => {
    const N = localStorage.getItem('N')
    const tipo = localStorage.getItem('type')
    let { nombre, apellido } = PeticionJWT();

    return (
        <>
      <div className='contenedore'>
          {N==='905'&& <TarjetaEmpleado905/>}
          { N==='906'&& <TarjetaEmpleado906/>}
            { N==='0000'&& <TarjetaEmpleado0000/>}   
               </div>
         </>   
    )
}
