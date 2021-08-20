import { PeticionJWT } from '../../auth/PeticionJWT'
import { CardAprobaciones } from './CardAprobaciones'
import { CardEstado } from './CardEstado'
import './css/perfiles.css'
export const PerfilEmpleado = ({history}) => {
    const N = localStorage.getItem('N')
    const tipo = localStorage.getItem('type')
    
   PeticionJWT(); 
    let array = ['905','906','0000'];
        return (
        <>
      <div className='contenedore'>
            <CardEstado/>
            { N=== '905 '|| N === '906'?
            <CardAprobaciones/>:''
            }
     
         

        
               </div>
         </>   
    )
}
