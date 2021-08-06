import React from 'react'
import { PeticionGETIntranet } from "../../../../config/PeticionGET";
import { HelperTABLE } from '../../../../helpers/HelperTABLE'
import { columnasFactAnno } from './columnasFactAnno'
export const FacturacionAnno = () => {
    const getFactAnno= PeticionGETIntranet('/facturacion/anno')
    return (
       <HelperTABLE
       hoja={'Facturacion por Año'}
       namefile={'Facturacion por Año'}
       columns={columnasFactAnno}
       data={getFactAnno}
       boton={true}
       
       />
    )
}
