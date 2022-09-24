import React from "react";
import { columnasMes } from "./columnasMes";
import { HelperTABLEobj } from "../../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../../helpers/funciones";

export const FacturacionMes = () => {
  const getFacturacionMes = filtradoPorVendedor("/reportes/facturacion/mes");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
      {getFacturacionMes === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          title="Facturacion Cada Mes"
          hoja={"facturacion mes"}
          namefile={"facturacion mes"}
          columns={columnasMes}
          data={getFacturacionMes}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 200 : 300}
          colExcel={columnasMes}
        />
      )}
    </>
  );
};
