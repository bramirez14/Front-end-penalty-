import React from 'react'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { filtradoPorVendedor } from '../helpers/funciones'
import { columnasRdo } from './columnasRemitado'

export const Remitado = () => {
 const getRemitado=filtradoPorVendedor('/remmes')
 var mediaqueryList = window.matchMedia("(min-width: 1200px)");
    return (
       <HelperTABLEobj
       title='Remitado'
       hoja={'Remitado'}
       namefile={'Remitado'}
       columns={columnasRdo}
       data={getRemitado}
       boton={true}
       paginas={true}
       y={mediaqueryList.matches ? 200 : 300}
       colExcel={columnasRdo}
       />
    )
}
