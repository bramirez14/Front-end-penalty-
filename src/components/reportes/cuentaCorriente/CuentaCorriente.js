import React from "react";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../helpers/funciones";
import { columnasCtaCte } from "./columnasCtaCte";

export const CuentaCorriente = () => {
  const getctacte = filtradoPorVendedor("/cuentacorriente");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");

  return (
    <>
      {getctacte === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          hoja={"cta cte"}
          namefile={"cuenta corriente"}
          data={getctacte}
          columns={columnasCtaCte}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 400 : 500}
        />
      )}
    </>
  );
};
