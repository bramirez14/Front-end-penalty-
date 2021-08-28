import React, { useState, useEffect } from "react";
import { axiosURL } from "../../config/axiosURL";
import { PeticionGET } from "../../config/PeticionGET";
import { Sueldo } from "./Sueldo";
import Swal from "sweetalert2";
import "./css/anticipoGasto.css";

export const SueldoContainer = ({ history }) => {
  const id = localStorage.getItem("uid");
  const [data, setData] = useState([{ id: "", nombre: "" }]);
  const [anticipo, setAnticipo] = useState({
    sueldo: "Sueldo",
    fecha: new Date().toLocaleDateString(),
    usuarioId: id,
  });
  const { sueldo, fecha, usuarioId } = anticipo;

  /******fx de alerta para el usuario visual*******/
  const handleAlert = () => {
    Swal.fire({
      title: "Solicitud enviada",
      text: "Se aprobara en un plazo de 24hs, gracias por la espera.",
      imageUrl:
        "https://www.brazilianfootwear.com/assets/shared/marca/logo/19170a70b1da4a6813e39c8981517486.jpg",
      imageWidth: 300,
      imageHeight: 200,
      imageAlt: "penalty",
    });
  };

  const handleChange = (e) => {
    setAnticipo({
      ...anticipo,
      [e.target.name]: e.target.value,
    });
  };
  //fx para deteminar canntidad  de cuotas
  const verificarMes = () => {
    let vacio = [];
    let day = new Date().toLocaleDateString().split("/");
    let dataEnd = "31/12".split("/");
    let resta = dataEnd[1] - day[1];
    for (let i = 1; i <= resta; i++) {
      vacio.push({ id: i, nombre: i });
    }
    setData(vacio);
  };
  //calculamos el mes
  const mes = () => new Date().getMonth();

  //efecto q se produce una vez despes del rederizado
  useEffect(() => {
    verificarMes();
  }, []);
  const datosUsuario = PeticionGET(`/${id}`);
  const filtro = datosUsuario?.anticipo;
  const APROBACION = filtro?.[filtro?.length - 1]?.estadoFinal;
  //fx para guardar anticipo con axios en DB
  const guardarAnticipo = async (values) => {
    const result = await axiosURL.post("/anticipo", {
      ...values,
      sueldo,
      fecha,
      estado: "pendiente",
      estadoFinal: "pendiente",
      f: new Date().toLocaleString(),
    });
    if (result.status === 200) {
      history.push("/");
    }
  };
  //submit para enviar el formulario
  const handleSubmit = async (v) => {
    console.log(v);
    if (v.importe >= 30001 && sueldo === "Aguinaldo") {
      alert(" La opcion AGUINALDO , solo cubre un monto inferior a 30000");
    } else {
      handleAlert();
      const { data } = await alerta({ ...v, sueldo });
      let u = { ...v, usuarioId, fecha, alertaId: data?.alertaCreada?.id };
      guardarAnticipo(u);
    }
  };

  //alerta.
  const alerta = async (value) => {
    const mailEmpleado = datosUsuario.email;
    const mailGerente = datosUsuario.gerente.email;
    const nuevoObj = {
      alerta: value.mensaje,
      info: `Tenes un anticipo de ${value.sueldo}`,
      nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
      f: new Date().toLocaleString(),
      emisor: mailEmpleado,
      receptor: mailGerente,
      estado:'activa',
      usuarioId:id
    };
    const res = await axiosURL.post("/msg/alerta", nuevoObj);
    return res;
  };
  return (
    <Sueldo
      handleSubmit={handleSubmit}
      APROBACION={APROBACION}
      handleChange={handleChange}
      sueldo={sueldo}
      data={data}
      mes={mes()}
    />
  );
};
