import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasSCC } from './columnasSCC'

export const SCC = () => {
    const getSCC= PeticionGETIntranet('/scc')
    return (
        <HelperTABLEobj
        hoja={'SCC'}
        namefile={'SCC'}
        columns={columnasSCC}
        data={getSCC}
        boton={true}
        paginas={true}
        />
    )
}
