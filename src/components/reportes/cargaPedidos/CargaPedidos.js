import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasCargaPedidos } from './columnasCargaPedidos'

export const CargaPedidos = () => {
const getCargaPedidos= PeticionGETIntranet('/carga/pedidos')

    return (
        <HelperTABLEobj
        hoja={'Control de Carga de Pedidos'}
        nmaefile={'Control de Carga de Pedidos'}
        columns={columnasCargaPedidos}
        data={getCargaPedidos}
        boton={true}
        paginas={true}

        
        />
    )
}
