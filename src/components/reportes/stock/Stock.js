import React from 'react'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { filtradoPorVendedor } from '../helpers/funciones'
import { columnasStock } from './columnasStock'

export const Stock = () => {
    const getSotck=filtradoPorVendedor('/stock');
    var mediaqueryList = window.matchMedia("(min-width: 1200px)");
    return (
      <>{
        getSotck===undefined?
        <h1 style={{marginTop:200,marginLeft:300}}>Compruebe su conexion!!!</h1>:
        <HelperTABLEobj
        hoja={'Stock'}
        namefile={'Stock'}
        columns= {columnasStock}
        data={getSotck}
        boton={true}
        paginas={true}
        y={mediaqueryList.matches?400:500}

        />
      }
      </>
    )
}
