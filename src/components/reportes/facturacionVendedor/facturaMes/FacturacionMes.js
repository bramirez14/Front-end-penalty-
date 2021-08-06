import React from "react";
import { columnasMes } from "./columnasMes";
import { PeticionGETIntranet } from "../../../../config/PeticionGET";
import { HelperTABLE } from "../../../../helpers/HelperTABLE";

export const FacturacionMes = () => {
  const getFacturacionMes= PeticionGETIntranet('/facturacion/mes')
  console.log(getFacturacionMes);
  return(
    <HelperTABLE
    hoja={'facturacion mes'}
    namefile={'facturacion mes'}
    columns={columnasMes}
    data={getFacturacionMes}
    boton={true}
    />
  )
};
