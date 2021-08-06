import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasCobranzasMes } from './columnaCobranzaMes'

export const CobranzaMes = () => {
    const getCobranzas=PeticionGETIntranet('/cobranza/mes')
    return (
        <HelperTABLEobj
        hoja={'cobranzas'}
        namefile={'Cobranzas'}
        columns={columnasCobranzasMes}
        data={getCobranzas}
        boton={true}
        paginas={true}
        />
    )
}
