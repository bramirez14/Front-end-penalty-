import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasFutIngresos } from './columnasFutIngresos'

export const FuturosIngresos = () => {
    const getfuturosIngreso= PeticionGETIntranet('/futuros/ingresos')
      return (
    <HelperTABLEobj
    hoja={'Futuros Ingresos'}
    namefile={'Futuros Ingresos'}
    columns={columnasFutIngresos}
    data={getfuturosIngreso}
    boton={true}
    paginas={true}
    />
     
    )
}
