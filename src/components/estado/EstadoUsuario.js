import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { axiosURL } from "../../config/axiosURL";

import { Row, Col, Table, BackTop } from "antd";
import { AvatarImg } from "../img/Avatar";
import { DescripcionUsuario } from "./DescripcionUsuario";
import {  useSelector } from "react-redux";
import { columnasVacaciones } from "./columnas/columnasVacaciones";
import { columnasAnticipos } from "./columnas/columnasAnticipos";
import { columnasGastos } from "./columnas/columnasGastos";
export const EstadoUsuario = () => {
  /* const { useBreakpoint } = Grid;
  const screens = useBreakpoint(); */
  //console.log(screens);
  const [ , setVacaciones] = useState([]);
  const [, setSueldo] = useState([]);
  const [, setGasto] = useState([]);
  //vamos a ver las vacaciones tomadas en el ano; y cuantas les falta
  const id = localStorage.getItem("uid");
  const fechActual = new Date().getMonth();
  const anoActual = new Date().getFullYear();
  const get = async () => {
    let resp = await axiosURL(`/${id}`);
    const advertencia = resp.data.vacacion?.filter(
      (v) => v.diasFaltantes > 0 && fechActual === 11 && anoActual === v.periodo
    );
    const diasFaltantes = advertencia[0]?.diasFaltantes;
    const periodo = advertencia[0]?.periodo;
    //avisar en que debe tomarse todas las vacaciones antes de fin de ano;
    if (advertencia?.length > 0) {
      Swal.fire({
        title: `Tenes vacaciones pendiente del periodo ${periodo} y dias faltantes ${diasFaltantes}`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
    setVacaciones(resp.data.vacacion);
    setSueldo(resp.data.anticipo);
    setGasto(resp.data.gasto);
  };
  useEffect(() => {
    get();
  }, []);

  const { peticiones_GET } = useSelector((state) => state);
  const usuario = peticiones_GET?.usuario;

  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: "50%",
    backgroundColor: "#46a461",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={8}>
          <AvatarImg />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={14}>
          <DescripcionUsuario />
        </Col>
      </Row>
      <Table
        title={() => <h1>Vacaciones</h1>}
        columns={columnasVacaciones}
        dataSource={usuario?.vacacion?.reverse()}
      />

      <Table
        title={() => <h1>Anticipos de Sueldo o Aguinaldo</h1>}
        columns={columnasAnticipos}
        dataSource={usuario?.anticipo?.reverse()}
      />

      <Table
        title={() => <h1>Anticipos de Gastos</h1>}
        columns={columnasGastos}
        dataSource={usuario?.gasto?.reverse()}
      />
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    </>
  );
};
