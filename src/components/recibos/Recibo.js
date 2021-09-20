import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import "./css/recibo.css";
import { TablaIngresos } from "./TablaIngresos";
import { ClienteRecibo } from "./ClienteRecibo";
import { TablaLiquidacion } from "./TablaLiquidacion";
import { Resultados } from "./Resultados";
import { axiosURLIntranetCobranzas } from "../../config/axiosURL";
import { uuid } from "uuidv4";
import { PeticionGET } from "../../config/PeticionGET";
import { Grid, Tag } from "antd";
const { useBreakpoint } = Grid;

export const Recibo = () => {
  const N = localStorage.getItem("N");
  const id = localStorage.getItem("uid");
  const usuario = PeticionGET(`/${id}`);
  const uid = uuid().split("-")[0];
  const [liquidacionCliente, setLiquidacionCliente] = useState([]);
  const [ingresos, setIngresos] = useState([]); // a la DB
  const [dataCheck, setDataCheck] = useState([]); // a la DB
  const [efectivo, setEfectivo] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [retenciones, setRetenciones] = useState([]);
  const newIngresos = ingresos.map((n) => {
    return {
      ...n,
      nvendedor: N,
      nombrecompleto: `${usuario.nombre}${usuario.apellido}`,
      numerorecibo: uid,
    };
  });
  const newDataCheck = dataCheck.map((d) => {
    return {
      fecha: d.fecemision.split("T")[0],
      factura: d.cabeza,
      comprobante: d.codcabeza,
      importe: d.saldoml,
      nvendedor: N,
      nombrecompleto: `${usuario.nombre}${usuario.apellido}`,
      numerorecibo: uid,
      razonsocial:d.razonsoc,
      fechavencimiento:d.fecvenc.split("T")[0],
      cliente:d.cliente,
    };
  });

  const finalizar = async () => {
    const res = await axiosURLIntranetCobranzas.post("/recibos", {
      newIngresos,
      newDataCheck,
    });
    console.log(res);
  };
  const screens = useBreakpoint();

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={14} xl={14}>
          <ClienteRecibo
            cliente={liquidacionCliente}
            setCliente={setLiquidacionCliente}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <Resultados
            efectivo={efectivo}
            cheques={cheques}
            retenciones={retenciones}
            efectivoLiq={dataCheck}
          />
        </Col>

        <Col xs={24} sm={24} md={24} lg={14} xl={14}>
          <TablaIngresos
            data={ingresos}
            setData={setIngresos}
            setEfectivo={setEfectivo}
            setCheques={setCheques}
            setRetenciones={setRetenciones}
            screens={screens}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <TablaLiquidacion
            cliente={liquidacionCliente}
            setCliente={setLiquidacionCliente}
            dataCheck={dataCheck}
            setDataCheck={setDataCheck}
            screens={screens}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Button onClick={finalizar}>Finalizar</Button>
        </Col>
      </Row>
    </>
  );
};
