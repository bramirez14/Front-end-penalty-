import { Row } from 'antd'
import { PeticionJWT } from '../../auth/PeticionJWT'
import { CardAprobaciones } from './CardAprobaciones'
import { CardEstado } from './CardEstado'
import './css/perfiles.css'
export const PerfilEmpleado = ({history}) => {
    const N = localStorage.getItem('N')
    const tipo = localStorage.getItem('type')
   PeticionJWT(); 
        return (
        <>
      <div className='contenedore'>
            <CardEstado/>
<<<<<<< HEAD
            { N=== '905 '|| N === '906'?
            <CardAprobaciones/>:''
            }
=======
            { N==='905' || N==='906' ?
            <Row style={{marginTop:20}} >
            <CardAprobaciones />
            </Row>
            :
                ''         }
         

>>>>>>> db7a1fbd9bb3633fca6d3a3410198fc020320e5f
        
               </div>
         </>   
    )
}
