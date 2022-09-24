import React from "react";
import { PeticionGETIntranet } from "../../../../config/PeticionGET";
import { HelperTABLEobj } from "../../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../../helpers/funciones";
import { columnasFactMes } from "./columnasFactMesGral";

export const FacturacionMesGral = () => {
  const getFacturacionMesGral = filtradoPorVendedor("/reportes/facturacion/mesgral");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
      
        <HelperTABLEobj
          title="Facturacion General De Cada Mes"
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
