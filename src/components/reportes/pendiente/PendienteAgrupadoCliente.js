import React from "react";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../helpers/funciones";
import { columnasPendAgrupCliente } from "./columnasPendAgrupCliente";

export const PendienteAgrupadoCliente = () => {
  const getPendAgrupClientes = filtradoPorVendedor("/pendiente/agrupadocliente");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");
  return (
    <>
      {getPendAgrupClientes === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          hoja={" Pendiente Agrupado por CLiente"}
          namefile={" Pendiente Agrupado por CLiente"}
          columns={columnasPendAgrupCliente}
          data={getPendAgrupClientes}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 400 : 500}
        />
      )}
    </>
  );
};
