import React from 'react'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { filtradoPorVendedor } from '../helpers/funciones'
import { columnasStock } from './columnasStock'

export const Stock = () => {
    const getStock=filtradoPorVendedor('/sql/reportes/stock');
    console.log(getStock);
    var mediaqueryList = window.matchMedia("(min-width: 1200px)");
    return (
      <>{
        getStock===undefined?
        <h1 style={{marginTop:200,marginLeft:300}}>Compruebe su conexion!!!</h1>:
        <>
        
        <HelperTABLEobj
        title='Stock'
        hoja={'Stock'}
        namefile={'Stock'}
        columns= {columnasStock}
        data={getStock}
        boton={true}
        paginas={true}
        colExcel={columnasStock}

        />
        </>
      }
      </>
    )
}
