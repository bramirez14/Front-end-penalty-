import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasCliInhab } from './columnasCliInhab'

export const ClientesInhabilitados = () => {
    const getCliInhab=PeticionGETIntranet('/clientes/inhabilitados')
    return (
<HelperTABLEobj
hoja={'clientes Inhab'}
namefile={'Clientes Inhabilitados'}
columns={columnasCliInhab}
data={getCliInhab}
paginas={true}
boton={true}

/>
 )
}
