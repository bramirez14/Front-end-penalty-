import React from "react";
import { PeticionGETIntranet } from "../../../../config/PeticionGET";
import { HelperTABLEobj } from "../../../../helpers/HelperTABLEobj";
import { columnasFactMes } from "./columnasFactMesGral";

export const FacturacionMesGral = () => {
  const getFacturacionMesGral = PeticionGETIntranet("/facturacion/mesgral");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
      
        <HelperTABLEobj
          hoja={"Facturacion Mes Gral"}
          namefile={"Facturacion Mes Gral"}
          columns={columnasFactMes}
          data={getFacturacionMesGral}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 200 : 300}
          colExcel={columnasFactMes}
        />
      
    </>
  );
};
