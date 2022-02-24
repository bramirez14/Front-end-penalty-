import React, { useState, useEffect  } from "react";
import { axiosURL } from "../../config/axiosURL";
import "./css/spiner.css";
import "./css/kilometros.css";

import { HelperTABLEobj } from "../../helpers/HelperTABLEobj";
import { TablaKm } from "./TablaKm";
import { FormKm } from "./FormKm";
import { FilesKm } from "./FilesKm";
import { Spin } from "antd";
import { useNavigate } from "react-router";

export const Kilometros = () => {
  const [spinner, setSpinner] = useState(false)
  const [stateKm, setStateKm] = useState([]);
  const id = localStorage.getItem("uid");

  const peticionGet = async () => {
    const { data } = await axiosURL.get("/rendiciones/kilometros");
    setStateKm(data);
  };
  useEffect(() => {
    peticionGet();
  }, []);

  const filtroUsuario = stateKm.filter((s) => s.usuarioId === parseInt(id));
  const filtroSinKmId = filtroUsuario.filter((d) => d.kilometroId === null);
  const idDB = filtroSinKmId?.map((i) => i.id);
  const kmRecorridos = filtroSinKmId.map((i) => i.KmRecorrido);
  const importeDB = filtroSinKmId.map((i) => i.importe);
  const totalKmDB = kmRecorridos.reduce((acumulador, item) => {
    return (acumulador = acumulador + item);
  }, 0);
  const importeTotalDB = importeDB.reduce((acumulador, item) => {
    return (acumulador = acumulador + item);
  }, 0);
  return (
    <Spin tip="Cargando..." spinning={spinner}  className='spinner'>
    <div style={{ display: "flex", flexWrap: "nowrap" }}>
      {/* */}
      <div style={{ marginLeft: 270 }}>
        <HelperTABLEobj
          title={<FormKm get={peticionGet} />}
          data={filtroSinKmId}
          columns={TablaKm(() => peticionGet())}
          footer={
            <FilesKm
              idDB={idDB}
              totalKmDB={totalKmDB}
              importeTotalDB={importeTotalDB}
              history={useNavigate()}
              setSpinner={setSpinner}
            />
          }
        />
      </div>
    </div>
    </Spin>
  );
};
