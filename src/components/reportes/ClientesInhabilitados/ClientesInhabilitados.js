import React from "react";
import { HelperTABLEobj } from "../../../helpers/HelperTABLEobj";
import { filtradoPorVendedor } from "../helpers/funciones";
import { columnasCliInhab } from "./columnasCliInhab";

export const ClientesInhabilitados = () => {
  const getCliInhab = filtradoPorVendedor("/sql/reportes/cliente/inhabilitado");
  console.log(getCliInhab);
  var mediaqueryList = window.matchMedia("(min-width: 1200px)");
  return (
    <>
      {getCliInhab === undefined ? (
        <h1 style={{ marginTop: 200, marginLeft: 300 }}>
          Compruebe su conexion!!!
        </h1>
      ) : (
        <HelperTABLEobj
          title="Clientes Inhabilitados"
          hoja={"clientes Inhab"}
          namefile={"Clientes Inhabilitados"}
          columns={columnasCliInhab}
          data={getCliInhab}
          paginas={true}
          boton={true}
        y={mediaqueryList.matches?400:500}
        colExcel={columnasCliInhab}
          
        />
      )}
    </>
  );
};
