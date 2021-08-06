import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLE } from '../../../helpers/HelperTABLE'
import { columnasRdo } from './columnasRemitado'

export const Remitado = () => {
 const getRemitado=PeticionGETIntranet('/remmes')
    return (
       <HelperTABLE
       hoja={'Remitado'}
       namefile={'Remitado'}
       columns={columnasRdo}
       data={getRemitado}
       boton={true}
       />
    )
}
