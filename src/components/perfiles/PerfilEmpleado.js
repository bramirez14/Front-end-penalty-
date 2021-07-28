import { PeticionJWT } from '../../auth/PeticionJWT'
import './css/perfiles.css'
import { TarjetaEmpleado0000 } from './TarjetaEmpleado0000'
import {TarjetaEmpleado905} from './TarjetaEmpleado905'
import { TarjetaEmpleado906 } from './TarjetaEmpleado906'
export const PerfilEmpleado = ({history}) => {
    const N = localStorage.getItem('N')
    const tipo = localStorage.getItem('type')
    
   PeticionJWT(); 
    let array = ['905','906','0000'];
        return (
        <>
      <div className='contenedore'>

      
            {N==='905'? <TarjetaEmpleado905/>:N==='906'?
            <TarjetaEmpleado906/>:N==='0000'?<TarjetaEmpleado0000/>:
            <h1>Bienvenido/a</h1>
           }

        
               </div>
         </>   
    )
}
