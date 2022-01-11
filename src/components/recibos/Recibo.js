import React, { useState,useContext,useRef } from "react";
import { Row, Col, Button } from "antd";
import "./css/recibo.css";
import { TablaIngresos } from "./TablaIngresos";
import { ClienteRecibo } from "./ClienteRecibo";
import { TablaLiquidacion } from "./TablaLiquidacion";
import { Resultados } from "./Resultados";
import { axiosURL, axiosURLIntranetCobranzas } from "../../config/axiosURL";
import { uuid } from "uuidv4";
import { PeticionGET } from "../../config/PeticionGET";
import { Grid, Spin } from "antd";
import { SocketContext } from "../../context/SocketContext";
import './css/listarecibo.css';
import Swal from 'sweetalert2'
import { ModalPDF } from "../../helpers/ModalPDF";
import Pdf from "react-to-pdf";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router";
const { useBreakpoint } = Grid;

export const Recibo = () => {
  const navigate = useNavigate();
  const {socket} = useContext(SocketContext)
  const N = localStorage.getItem("N");
  const id = localStorage.getItem("uid");
  const usuario = PeticionGET(`/${id}`);
  const todosUsuarios=PeticionGET('/allusers')
  const uid = uuid().split("-")[0];
  const [liquidacionCliente, setLiquidacionCliente] = useState([]);
  const [ingresos, setIngresos] = useState([]); // a la DB
  const [dataCheck, setDataCheck] = useState([]); // a la DB
  const [efectivo, setEfectivo] = useState([]);
  const [cheques, setCheques] = useState([]);
  const [retenciones, setRetenciones] = useState([]);
  const [depositos, setDepositos] = useState([]);
  const [spinner, setSpinner] = useState(false)
  const datos = [{ingresos:ingresos},{cliente:liquidacionCliente},{facturacion:dataCheck}]
  const newIngresos = ingresos.map((n) => {
    return {
      ...n,
      nvendedor: N,
      nombrecompleto: `${usuario.nombre}${usuario.apellido}`,
      numerorecibo: uid,
      razonsocial:dataCheck[0]?.razonsoc,

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
setSpinner(true)
const response= await axiosURL.post('/generar/pdf/recibo',datos);
console.log(response.data.status);

   if (response.data.status === 200) {
     setSpinner(false)
      let ge = await axiosURL.get("peticion/pdf/recibo", { responseType: "blob" });
      const pdfBlob = await new Blob([ge.data], { type: "application/pdf" });
      saveAs(pdfBlob, `recibo${uuid().split("-")[0]}.pdf`);
    }

 const res = await axiosURLIntranetCobranzas.post("/recibos", {
      newIngresos,
      newDataCheck,
    });
   const filtrousuarios907= todosUsuarios.filter(t=> t.nvendedor==='907')
    for (const iterator of filtrousuarios907) {
  const nuevoObj = {
    alerta:'proceso pendiente' ,
    info:`Tenes un recibo provisorio`,
    nombre:`${usuario.nombre}${usuario.apellido}`,
    f: new Date().toLocaleString(),
    emisor: usuario.email,
    receptor: iterator.email,
    estado:'activa',
    path:'/lista/recibo',
    usuarioId:usuario.id
  };
socket.emit('alerta-nueva', nuevoObj);
} 
if(res.data.status=== 200){
Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'El recibo se guardo con exito!!!',
  showConfirmButton: false,
  timer: 1500
})

}

navigate('/perfil')

};

  const screens = useBreakpoint();

  return (
    <>
     <Spin tip="Cargando..." spinning={spinner}  className='spinner'>
      <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
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
            depositos={depositos}
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
            setDepositos={setDepositos}
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
   </Spin>
    </>
  );
};
