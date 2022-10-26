import React from "react";
import { HelperTABLEobj } from "../../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../../helpers/funciones";
import { columnasFactAnno } from "./columnasFactAnno";
export const FacturacionAnno = () => {
  const getFactAnno = filtradoPorVendedor("/reportes/facturacion/anno");
  
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
      {getFactAnno === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          title="Facturacion Por Año"
          hoja={"Facturacion por Año"}
          namefile={"Facturacion por Año"}
          columns={columnasFactAnno}
          data={getFactAnno}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 200 : 300}
          colExcel={columnasFactAnno}

        />
      )}
    </>
  );
};
