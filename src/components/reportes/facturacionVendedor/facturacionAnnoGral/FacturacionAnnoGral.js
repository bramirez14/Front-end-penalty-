import React from "react";
import { PeticionGETIntranet } from "../../../../config/PeticionGET";
import { HelperTABLEobj } from "../../../../helpers/HelperTABLEobj";
import { columnasFactAnnoGral } from "./columnasFactAnnoGral";

export const FacturacionAnnoGral = () => {
  const getFactAnnoGral = PeticionGETIntranet("/facturacion/annogral");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
      {getFactAnnoGral === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          title="Facturacion General De Cada Año "
          hoja={"Factruacion Año Gral"}
          namefile={"Factruacion Año Gral"}
          columns={columnasFactAnnoGral}
          data={getFactAnnoGral}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 200 : 300}
          colExcel={columnasFactAnnoGral}
        />
      )}
    </>
  );
};
