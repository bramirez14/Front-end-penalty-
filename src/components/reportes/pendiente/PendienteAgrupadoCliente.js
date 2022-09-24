import React from "react";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../helpers/funciones";
import { columnasPendAgrupCliente } from "./columnasPendAgrupCliente";

export const PendienteAgrupadoCliente = () => {
  const getPendAgrupClientes = filtradoPorVendedor("/sql/reportes/pendientes/web");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");
  return (
    <>
      {getPendAgrupClientes === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          title="Pendiente Agrupado Por Cliente"
          hoja={" Pendiente Agrupado por Cliente"}
          namefile={" Pendiente Agrupado por Cliente"}
          columns={columnasPendAgrupCliente}
          data={getPendAgrupClientes}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 400 : 500}
          colExcel={columnasPendAgrupCliente}
        />
      )}
    </>
  );
};
