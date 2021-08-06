import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLE } from '../../../helpers/HelperTABLE'
import { columnasFactDet } from './columnasFactDetallada'

export const FacturacionDetalladata = () => {
    const getFactDetallada= PeticionGETIntranet('/facturacion/detallada')
    return (
        <HelperTABLE
        columns={columnasFactDet}
        data={getFactDetallada}
        paginas={true}
        />
    )
}
