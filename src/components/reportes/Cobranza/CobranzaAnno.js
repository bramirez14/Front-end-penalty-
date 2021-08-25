import React from 'react'
import { PeticionGETIntranet } from '../../../config/PeticionGET'
import { HelperTABLEobj } from '../../../helpers/HelperTABLEobj'
import { columnasCobranzasAnno } from './columnasCobranzaAnno'

export const CobranzaAnno = () => {
    const getCobranzas=PeticionGETIntranet('/cobranza/anno')
    var mediaqueryList = window.matchMedia("(min-width: 1200px)");
    
    return (
<>{getCobranzas===undefined?
 <h1 style={{marginTop:200,marginLeft:300}}>Compruebe su conexion!!!</h1>:
 <HelperTABLEobj
        hoja={'cobranzas'}
        namefile={'Cobranzas'}
        columns={columnasCobranzasAnno}
        data={getCobranzas}
        boton={true}
        paginas={true}
        y={mediaqueryList.matches?200:300}
        />

}</>


       
    )
}
