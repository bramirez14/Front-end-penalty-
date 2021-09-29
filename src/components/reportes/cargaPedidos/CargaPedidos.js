import React from "react";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../helpers/funciones";
import { columnasCargaPedidos } from "./columnasCargaPedidos";

export const CargaPedidos = () => {
  const getCargaPedidos = filtradoPorVendedor("/carga/pedidos");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");
  return (
    <>
      {getCargaPedidos === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          hoja={"Control de Carga de Pedidos"}
          namefile={"Control de Carga de Pedidos"}
          columns={columnasCargaPedidos}
          data={getCargaPedidos}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 370 : 400}
          colExcel={columnasCargaPedidos }
        />
      )}
    </>
  );
};
