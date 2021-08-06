import React from 'react'
import { PeticionGETIntranet } from '../../../../config/PeticionGET'
import { HelperTABLE } from '../../../../helpers/HelperTABLE'
import { columnasFactMes } from './columnasFactMesGral'

export const FacturacionMesGral = () => {
    const getFacturacionMesGral=PeticionGETIntranet('/facturacion/mesgral')
    return (
        <HelperTABLE
        hoja={'Facturacion Mes Gral'}
        namefile={'Facturacion Mes Gral'}
        columns={columnasFactMes}
        data={getFacturacionMesGral}
        boton={true}

        />
    )
}
