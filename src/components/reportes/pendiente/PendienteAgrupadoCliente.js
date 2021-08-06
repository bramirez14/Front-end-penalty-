import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasPendAgrupCliente } from './columnasPendAgrupCliente'

export const PendienteAgrupadoCliente = () => {
    const getPendAgrupClientes = PeticionGETIntranet('/pendiente/agrupadocliente')
    return (
       <HelperTABLEobj
       hoja={' Pendiente Agrupado por CLiente'}
       namefile={' Pendiente Agrupado por CLiente'}
       columns={columnasPendAgrupCliente}
       data={getPendAgrupClientes}
       boton={true}
       paginas={true}
       />
    )
}
