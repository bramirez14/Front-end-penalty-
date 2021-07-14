import React, { useState } from "react";
import { PeticionGET } from "../../config/PeticionGET";
import { axiosURL } from "../../config/axiosURL";
import { categorias } from "../rendiciones/categorias";
import { RendicionSinAnticipo } from "./RendicionSinAnticipo";
export const RendicionSinAnticipoContainer = ({ history }) => {
  const id = localStorage.getItem("uid");
  const [data, setData] = useState([]);
  const [state, setState] = useState({});
  const [crearRendicion, setCrearRendicion] = useState({
    notas: "",
    imagen: "",
  });
  const { notas, imagen } = crearRendicion;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrearRendicion({
      ...crearRendicion,
      [name]: value,
    });
  };
  const selectChangePago = (values, e) => {
    const { children, value } = e;
    setState({ ...state, children: children });
    setCrearRendicion({ ...crearRendicion, formapagoId: value });
  };
  const selectChangeCategoria = (values, e) =>
    setCrearRendicion({ ...crearRendicion, categoria: e.value });

  /**Delte img del draw drop */
  const handleDelete = (e) => {
    setData([]);
    setCrearRendicion({
      ...crearRendicion,
      imagen: "",
    });
  };

  const handleSubmit = async (values) => {
    let obj = {
      fecha: new Date().toLocaleDateString(),
      usuarioId: id,
      sinAnticipo: "sin",
      estado: "pendiente",
      estadoFinal: "pendiente",
      notificacion: "activa",
    };
    let f = new FormData();
    f.append("imagen", imagen);
    f.append("importe", values.importe);
    f.append("importerendido", values.importe);
    f.append("categoria", values.categoria);
    f.append("notas", values.notas);
    f.append("fecha", obj.fecha);
    f.append("usuarioId", obj.usuarioId);
    f.append("formapagoId", values.formapagoId);
    f.append("sinAnticipo", obj.sinAnticipo);
    f.append("estado", obj.estado);
    f.append("estadoFinal", obj.estadoFinal);
    
    let result = await axiosURL.post("/gasto/rendicion", f);
    if (result.data) {
      history.push("/gastos");
    }
  };
  /**Fin Submit */
  /**peticio get de forma de pago */
  let getFpago = PeticionGET("/mpagos");
  /**fin peticion get forma de pago */
  const estilo = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 };
  const handleBack = () => history.push("/gastos");
  return (
    <RendicionSinAnticipo
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBack={handleBack}
      selectChangeCategoria={selectChangeCategoria}
      categorias={categorias}
      selectChangePago={selectChangePago}
      getFpago={getFpago}
      notas={notas}
      estilo={estilo}
      data={data}
      crearRendicion={crearRendicion}
      state={state}
      setData={setData}
      setCrearRendicion={setCrearRendicion}
      handleDelete={handleDelete}
    />
  );
};
