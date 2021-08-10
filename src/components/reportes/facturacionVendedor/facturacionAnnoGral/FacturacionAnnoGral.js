import React from "react";
import { PeticionGETIntranet } from "../../../../config/PeticionGET";
import { HelperTABLEobj } from "../../../../helpers/HelperTABLEobj";
import { columnasFactAnnoGral } from "./columnasFactAnnoGral";

export const FacturacionAnnoGral = () => {
  const getFactAnnoGral = PeticionGETIntranet("/facturacion/annogral");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
     
        <HelperTABLEobj
          hoja={"Factruacion Año Gral"}
          namefile={"Factruacion Año Gral"}
          columns={columnasFactAnnoGral}
          data={getFactAnnoGral}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 200 : 300}
        />
      
    </>
  );
};
