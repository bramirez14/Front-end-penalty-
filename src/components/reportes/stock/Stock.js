import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasStock } from './columnasStock'

export const Stock = () => {
    const getSotck=PeticionGETIntranet('/stock')
    return (
      <HelperTABLEobj
      hoja={'Stock'}
      namefile={'Stock'}
      columns= {columnasStock}
      data={getSotck}
      boton={true}
      paginas={true}
      />
    )
}
