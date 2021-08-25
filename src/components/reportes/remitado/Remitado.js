import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLE } from '../../../helpers/HelperTABLE'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasRdo } from './columnasRemitado'

export const Remitado = () => {
 const getRemitado=PeticionGETIntranet('/remmes')
 var mediaqueryList = window.matchMedia("(min-width: 1200px)");
    return (
       <HelperTABLEobj
       hoja={'Remitado'}
       namefile={'Remitado'}
       columns={columnasRdo}
       data={getRemitado}
       boton={true}
       paginas={true}
       y={mediaqueryList.matches ? 200 : 300}
       />
    )
}
