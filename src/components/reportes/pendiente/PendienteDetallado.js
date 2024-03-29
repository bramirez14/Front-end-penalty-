import React from 'react'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { filtradoPorVendedor } from '../helpers/funciones'
import { columnasPendienteDetallado } from './columnasPendienteDetallado'

export const PendienteDetallado = () => {
    const getPendienteDetallado=filtradoPorVendedor('/sql/reportes/pendientes')
    var mediaqueryList = window.matchMedia("(min-width: 1200px)");
    return (
        <>
        { getPendienteDetallado=== undefined?
        <h1 style={{marginTop:200,marginLeft:300}}>Compruebe su conexion!!!</h1>
        : <HelperTABLEobj
        title='Pendiente Detallado'
       hoja={'Pendiente detallado'}
       namefile={'Pendiente detallado'}
        columns={columnasPendienteDetallado}
        data={getPendienteDetallado}
        boton={true}
        paginas={true}
        y={mediaqueryList.matches?400:500}
        colExcel={columnasPendienteDetallado}
       />}
      </>
    )
}
