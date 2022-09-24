import React from 'react'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { filtradoPorVendedor } from '../helpers/funciones'
import { columnasFutIngresos } from './columnasFutIngresos'

export const FuturosIngresos = () => {
    const getfuturosIngreso= filtradoPorVendedor('/sql/reportes/ingresos/vendedor');
    var mediaqueryList = window.matchMedia("(min-width: 1200px)");
      return (
        <>{
          getfuturosIngreso===undefined?
          <h1 style={{marginTop:200,marginLeft:300}}>Compruebe su conexion!!!</h1>
       :
       <HelperTABLEobj
      title='Futuros Ingresos'
       hoja={'Futuros Ingresos'}
       namefile={'Futuros Ingresos'}
       columns={columnasFutIngresos}
       data={getfuturosIngreso}
       boton={true}
       paginas={true}
       y={mediaqueryList.matches?400:500}
       colExcel={columnasFutIngresos}
       
       />
        }</>
   
     
    )
}
