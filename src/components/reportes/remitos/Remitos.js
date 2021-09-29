import React from "react";
import { filtradoPorVendedor } from "../helpers/funciones";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { remitos } from "./columnasRemitos";
export const Remitos = () => {
  const todosRemitos = filtradoPorVendedor("/remitos");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
      {
      todosRemitos === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          hoja={"Remitos"}
          nameFile={"Remitos"}
          columns={remitos}
          data={todosRemitos}
          paginas={true}
          boton={true}
          y={mediaqueryList.matches ? 350 : 500}
          colExcel={remitos}
        />
      )}
    </>
  );
};
