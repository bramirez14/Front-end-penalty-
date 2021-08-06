import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasPendienteDetallado } from './columnasPendienteDetallado'

export const PendienteDetallado = () => {
    const getPendienteDetallado=PeticionGETIntranet('/pendiente/detallado')
    return (
       <HelperTABLEobj
       hoja={'Pendiente detallado'}
       namefile={'Pendiente detallado'}
        columns={columnasPendienteDetallado}
        data={getPendienteDetallado}
        boton={true}
        paginas={true}
       />
    )
}
