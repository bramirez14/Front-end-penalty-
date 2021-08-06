 import React from 'react'
import { PeticionGETIntranet } from '../../../../config/PeticionGET'
import { HelperTABLE } from '../../../../helpers/HelperTABLE'
import { columnasFactAnnoGral } from './columnasFactAnnoGral'

 export const FacturacionAnnoGral = () => {
     const getFactAnnoGral = PeticionGETIntranet('/facturacion/annogral')
    
     return (
       <HelperTABLE
       hoja={'Factruacion Año Gral'}
       namefile={'Factruacion Año Gral'}
        columns={columnasFactAnnoGral}
        data={getFactAnnoGral}
       boton={true}

       />
     )
 }
 