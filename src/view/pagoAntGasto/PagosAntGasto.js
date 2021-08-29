import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { axiosURL } from "../../config/axiosURL";
import { conAnticipo906, enCurso, finalizar, sinAnticipo906 } from "./funciones";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { FormularioSinAnt } from "./FormularioSinAnt";
import { FormularioConAnt } from "./FormularioConAnt";
import { FormularioConAntPago } from "./FormularioConAntPago";
import { columnsant } from "./columnasAntPago";

export const PagosAntGasto = () => {
  const [dataGasto, setDataGasto] = useState([]);
  const [stateFile, setStateFile] = useState('');
  const [stateFilefinal, setStateFilefinal] = useState('');
 
  const getGastos = async () => {
    const { data } = await axiosURL.get("/gastos");
    setDataGasto(data);
  };
  useEffect(() => {
    getGastos();
  }, []);
  const sinAnticipo = sinAnticipo906(dataGasto);
  const conAnticipo = conAnticipo906(dataGasto);
  const anticipoTotal = [...sinAnticipo, ...conAnticipo];
  const columns = [
   ...columnsant,
    {
      title: "Acciones",
      key: "acciones",
      width:120,

      render: (state, file) => (
        <>
          {file.pagoRealizado === "Si" ? (
            <h5>Realizado</h5>
          ) : file.pagoRealizado === "En curso" && file.listo!=='Si' ? (
            <h5> En curso...</h5>
          ) : (
            <>
              {file.sinAnticipo === "sin" ? (
                <HelperMODAL
                  boton={"Completar"}
                  title={"Rendicion sin Anticipo"}
                  Submit={"Finalizar"}
                  Return={"Salir"}
                  click={() => finalizar(file.id,getGastos,stateFile,setStateFile,stateFilefinal,setStateFilefinal)}
                  noclick={() => {}}
                >
                  <FormularioSinAnt
                  stateFile={stateFile}
                  setStateFile={setStateFile}
                   stateFilefinal={stateFilefinal}
                    setStateFilefinal={setStateFilefinal}
                    orden={file.norden}
                    importeRendido={file.importerendido}
                  />
                </HelperMODAL>


              ) : file.listo === "Si" ? (
                <HelperMODAL
                  boton={"Completar"}
                  title={"Rendicion sin Anticipo"}
                  Submit={"Finalizar"}
                  Return={"Salir"}
                  click={() => finalizar(file.id,getGastos,stateFile,setStateFile,stateFilefinal,setStateFilefinal)}
                  noclick={() => {}}
                >
                  <FormularioConAnt
                    stateFile={stateFile}
                    stateFilefinal={stateFilefinal}
                    setStateFile={setStateFile}
                    setStateFilefinal={setStateFilefinal}
                    orden={file.norden}
                    importeRendido={file.importerendido}
                    importe={file.importe}
                  />
                </HelperMODAL>


              ) : (
                <HelperMODAL
                  boton={"Completar"}
                  Submit={"Pagado"}
                  Return={"Salir"}
                  click={() => enCurso(file.id,getGastos)}
                  noclick={() => {}}
                >
                  <FormularioConAntPago
                    orden={file.norden}
                    importe={file.importe}
                  />
                </HelperMODAL>
              )}
            </>
          )}
        </>
      ),
    },
  ];
  const datos = anticipoTotal?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
    };
  });

  return (
    <Table
      columns={columns}
      dataSource={datos}
      pagination={false}
      scroll={{y:500}}
    />
  );
};