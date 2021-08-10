import React from 'react'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { filtradoPorVendedor } from '../helpers/funciones'
import { columnasFactDet } from './columnasFactDetallada'

export const FacturacionDetalladata = () => {
    const getFactDetallada= filtradoPorVendedor('/facturacion/detallada')
    var mediaqueryList = window.matchMedia("(min-width: 1200px)");
   // const ancho= getFactDetallada.length == 1
    return (
        <>{getFactDetallada===undefined?
            <h1 style={{marginTop:200,marginLeft:300}}>Compruebe su conexion!!!</h1>:
            <HelperTABLEobj
            hoja={'Facturacion Detallada'}
            nameFile={'Facturacion Detalladata'}
            columns={columnasFactDet}
            data={getFactDetallada}
            paginas={true}
            boton={true}
            y={mediaqueryList.matches?400:500}
            />
           
           }</>
        

    )
}
