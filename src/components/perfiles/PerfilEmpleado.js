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
            { N==='905' || N==='906' ?
            <Row style={{marginTop:20}} >
            <CardAprobaciones />
            </Row>
            :
                ''         }
               </div>
         </>   
    )
}
