import React from "react";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../helpers/funciones";
import { columnasCtaCteProv } from "./columnasCtaCtePro";

export const CuentaCteProveedores = () => {
  const getctacte = filtradoPorVendedor("/sql/reportes/ctacte/proveedores");
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");
  
  return (
    <>
      {getctacte === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          title="Cuenta Corriente Proveedores"
          hoja={"cta cte prov"}
          namefile={"cuenta corriente proveedores"}
          data={getctacte}
          columns={columnasCtaCteProv}
          boton={true}
          paginas={true}
          y={mediaqueryList.matches ? 350 : 500}
          colExcel={columnasCtaCteProv}
        />
      )}
    </>
  );
};
