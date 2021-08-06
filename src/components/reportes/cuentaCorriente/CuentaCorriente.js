import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasCtaCte } from './columnasCtaCte'

export const CuentaCorriente = () => {
    const getctacte = PeticionGETIntranet('/cuentacorriente')
    return (
        <HelperTABLEobj
        hoja={'cta cte'}
        namefile={'cuenta corriente'}
        data={getctacte}
        columns={columnasCtaCte}
        boton={true}
        
        />
    )
}
