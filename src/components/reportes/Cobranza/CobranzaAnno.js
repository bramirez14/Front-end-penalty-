import React from "react";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../helpers/funciones";
import { columnasCobranzasAnno } from "./columnasCobranzaAnno";

export const CobranzaAnno = () => {
  const getCobranzas = filtradoPorVendedor("/sql/reportes/cobranza");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
      {getCobranzas === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          title="Cobranzas De Cada Año"
          hoja={"cobranzas "}
          namefile={"Cobranzas"}
          columns={columnasCobranzasAnno}
          data={getCobranzas}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 200 : 300}
          colExcel={columnasCobranzasAnno}
        />
      )}
    </>
  );
};
