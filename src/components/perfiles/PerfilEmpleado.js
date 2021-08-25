import { Row } from 'antd'
import { PeticionJWT } from '../../auth/PeticionJWT'
import { CardAprobaciones } from './CardAprobaciones'
import { CardEstado } from './CardEstado'
export const PerfilEmpleado = ({history}) => {
    const N = localStorage.getItem('N')
    const tipo = localStorage.getItem('type')
   PeticionJWT(); 
        return (
        <>
        
            <CardEstado/>

            { N==='905' || N==='906' ?
            <Row style={{marginTop:20}} >
            <CardAprobaciones />
            </Row>
            :
                ''         }
<<<<<<< HEAD
               </div>
=======
               
>>>>>>> 928bbaa213641cd285e23b7a51ad5d18b81bfdeb
         </>   
    )
}
