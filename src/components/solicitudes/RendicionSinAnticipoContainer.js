import React, { useState } from "react";
import { PeticionGET } from "../../config/PeticionGET";
import { axiosURL } from "../../config/axiosURL";
import { categorias } from "../rendiciones/categorias";
import { RendicionSinAnticipo } from "./RendicionSinAnticipo";
import { alerta } from "./helpers/funciones";
export const RendicionSinAnticipoContainer = ({ history }) => {
  const [spinner, setSpinner] = useState(false)
  const id = localStorage.getItem("uid");
  const [data, setData] = useState([]);
  const [state, setState] = useState({});
  const [crearRendicion, setCrearRendicion] = useState({
   categoria:'',

  });
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
    console.log(values);
    setSpinner(true)
    
//   const {data} = await alerta(objs)
    let obj = {
      fecha: new Date().toLocaleDateString(),
      usuarioId: id,
      sinAnticipo: "sin",
      estado: "pendiente",
      estadoFinal: "pendiente",
      notificacion: "activa",

    };
    let f = new FormData();
    f.append("file", values.file?.[0]?.originFileObj);
    f.append("importe", values.importe);
    f.append("importerendido", values.importe);
    f.append("categoria", values.categoria);
    f.append("nota", values.nota);
    f.append("fecha", obj.fecha);
    f.append("usuarioId", obj.usuarioId);
    f.append("formapagoId", values.formapagoId);
    f.append("sinAnticipo", obj.sinAnticipo);
    f.append("estado", obj.estado);
    f.append("estadoFinal", obj.estadoFinal);
    let result = await axiosURL.post("/gasto/rendicion/sinanticipo", f);
    console.log(result);
    if(result.data?.error?.errno===-3008){
      alert('Compruebe su connexion!!!')
      setSpinner(false)
    }
    if (result.data.status === 200) {
      history.push("/gastos");
    }
  };
  console.log(crearRendicion);

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
      estilo={estilo}
      data={data}
      crearRendicion={crearRendicion}
      state={state}
      setData={setData}
      setCrearRendicion={setCrearRendicion}
      handleDelete={handleDelete}
      spinner={spinner}
      
    />
  );
};
