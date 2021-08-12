import React from "react";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../helpers/funciones";
import { columnasSCC } from "./columnasSCC";

export const SCC = () => {
  const getSCC = filtradoPorVendedor("/scc");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");
  return (
    <>
      {getSCC === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          hoja={"SCC"}
          namefile={"SCC"}
          columns={columnasSCC}
          data={getSCC}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 350 : 500}
        />
      )}
    </>
  );
};
