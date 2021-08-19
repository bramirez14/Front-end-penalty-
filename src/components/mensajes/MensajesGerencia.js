import React,{ useEffect,useContext} from "react";
import { Row, Col, List, Button, } from "antd";
import {
  Get,
  GetGastosConAnt,
  GetGastosSinAnt,
  KmPendiente,
} from "../perfiles/helpers/funciones";
import { FaBullhorn } from "react-icons/fa";
import { run } from "../helper/funciones";
import { PeticionGET } from "../../config/PeticionGET";
import { Link } from "react-router-dom";
import { axiosURL } from "../../config/axiosURL";
import { UserContext } from "../../contexto/UserContext";
import io from "socket.io-client";

export const MensajesGerencia = ({history}) => {
  useEffect(() => {
    const socket =  io.connect( "http://localhost:4000",{ 
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,})
    //console.log(socket);
    console.log(socket);
   
  }, []);


  const {msj,setMsj} = useContext(UserContext)
  const anticipos = Get("/anticipo");
  const anticiposnew = anticipos.map((a) => {
    return { ...a, link: "/aprobacion/sueldo", titulo: "Anticipo de Sueldo",linkDB:`/alerta/anticipo/${a.id}` };
  });

  const vacaciones = Get("/vacaciones");
  const vacacionesnew = vacaciones.map((v) => {
    return {
      ...v,
      link: "/aprobacion/vacaciones",
      titulo: "Vacaciones",
      mensaje: v.obs,
      linkDB:`/alerta/vacaciones/${v.id}`
    };
  });

  const gastosConAnt = GetGastosConAnt("/gastos");
  const gastosConAntnew = gastosConAnt.map((a) => {
    return {
      ...a,
      link: "/aprobacion/gasto",
      titulo: "Gasto con Anticipo",
      mensaje: a.notas,
      linkDB:`/alerta/gasto/${a.id}`
    };
  });

  const gastosSinAnt = GetGastosSinAnt("/gastos");
  const gastosSinAntnew = gastosSinAnt.map((a) => {
    return {
      ...a,
      link: "/aprobacion/gasto",
      titulo: "Gasto sin Anticipo",
      mensaje: "no hay!!!",
      linkDB:`/alerta/gasto/${a.id}`
    };
  });

  const km = KmPendiente("/todos/kilometros");
  const kmnew = km.map((a) => {
    return { ...a, link: "/aprobacion/km", titulo: "kilometros",linkDB:`/alerta/km/${a.id}` };
  });
  /**Sector respuesta */
  const id = localStorage.getItem("uid");
  const { anticipo, gasto, vacacion, kilometro } = PeticionGET(`/${id}`);
  const filtroAnt = anticipo?.filter((a) => a.fd !== null);
  const filtroGasto = gasto?.filter((a) => a.fd !== null);
  const filtroVacacion = vacacion?.filter((a) => a.fd !== null);
  const filtrokilometro = kilometro?.filter((a) => a.fd !== null);

  const respuesta = (filtroAnt,
  filtroGasto,
  filtrokilometro,
  filtroVacacion === undefined
  )
    ? undefined
    : [...filtroAnt, ...filtroGasto, ...filtroVacacion, ...filtrokilometro];
  const todosgtes =
    respuesta === undefined
      ? undefined
      : [
          ...anticiposnew,
          ...vacacionesnew,
          ...gastosConAntnew,
          ...gastosSinAntnew,
          ...kmnew,
          ...respuesta,
        ];

  const handleClick = async (data) => {
    console.log(data.linkDB);
    const resp=await axiosURL.put(data.linkDB,{notificacion:'activa'});
    console.log(resp);
    if(resp.status===200){
      const eliminado=todosgtes.filter(t=>t.id!== data.id)
      setMsj(eliminado)
    }
  };
  return (
    <List
      bordered
      dataSource={todosgtes}
      style={{
        width: "400px",
        margin: "auto",
        borderRadius: 10,
        backgroundColor: "#fff",
      }}
      renderItem={(item) => {
        return (
          <List.Item>
            <Row gutter="30" onClick={() => handleClick(item)}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 style={{ borderBottom: "solid 1px #ddd" }}>
                  {item.titulo}
                </h3>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <div className="circle"></div>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <FaBullhorn className="icon-bocina" />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="contenedor-inf">
                  <div className="item-despcription">
                    <span>Estado: {item.estadoFinal} </span>
                  </div>
                  <div className="item-despcription">
                    <span> mensaje: {item.mensaje} </span>
                  </div>
                </div>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                <div className="item-despcription">
                  <span style={{ color: "#46a461" }}> hace {run(item.f)}</span>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Link to={item.link}>
                  <Button type="link">Mas...</Button>
                </Link>
              </Col>
            </Row>
          </List.Item>
        );
      }}
    />
  );
};
