import React from "react";
import { Row, Col, Card, Tooltip } from "antd";
import { PeticionJWT } from "../../auth/PeticionJWT";
import { PeticionGET } from "../../config/PeticionGET";
import { GiReceiveMoney, GiCheckMark, GiCancel } from "react-icons/gi";
import { BiTimeFive} from "react-icons/bi";
import { FaUmbrellaBeach, FaRegMoneyBillAlt } from "react-icons/fa";
import { AiFillCar} from "react-icons/ai";

import "./css/cardEstado.css";
export const CardEstado = () => {
  const id = localStorage.getItem("uid");
  const getjwt = PeticionJWT();
  const { nombre, apellido } = getjwt;
  const datosUsuarios = PeticionGET(`/${id}`);
  const anticipo = datosUsuarios?.anticipo;
  const vacacion = datosUsuarios?.vacacion;
  const km = datosUsuarios?.kilometro;
  const gasto = datosUsuarios?.gasto;

  const ultimoAnticipo = anticipo?.[anticipo?.length - 1];
  const ultimaVacacion = vacacion?.[vacacion?.length - 1];
  const ultimoGasto = gasto?.[gasto?.length - 1];
  const ultimoKm = km?.[km?.length - 1];
  
  const verificacion =(data) =>{
    return data === "aprobado" ? 
    (
       <Tooltip title="aprobado">
          <GiCheckMark />
        </Tooltip>
      ) : 
      data === "rechazado"?
       (
        <Tooltip title="rechazado">
          <GiCancel style={{ fontSize: 20, color: "red" }} />
        </Tooltip>
      ): 
      <Tooltip title="pendiente...">
      <BiTimeFive style={{ fontSize: 20, color: "#D3F70B" }} />
    </Tooltip>
  }
  const dtos=PeticionGET('/departamentos')
  return (
    <>
      <Row gutter={[20,20]} >

{/**Sueldo */}
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
           
 <Card className="card-sueldo" >
 <div className="sueldo">
   <GiReceiveMoney style={{ fontSize: 30 }} />
 </div>
 {anticipo?.length>0?
 <div className="datos">
   <div className="verificacion">{verificacion(ultimoAnticipo?.estadoFinal)}</div>
   <h5 className="sueldo-item">
     <b>Ultimo Anticipo solicitado</b>
   </h5>
   <h5 className="sueldo-item">
     <b>Devolucion: {ultimoAnticipo?.sueldo}</b>
   </h5>
   <h5 className="sueldo-item">
     <b>Cuotas: {ultimoAnticipo?.cuotas}</b>
   </h5>
   <h5 className="sueldo-item">
     <b> Importe: ${ultimoAnticipo?.importe} </b>
   </h5>
 </div>:
 <Tooltip title=" Sueldo"><h2>No hay notificaciones!!!</h2></Tooltip>
 }
 </Card>
            
        
        </Col>
{/**Vacaciones */}
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card className="card-vacaciones">
            <div className="vacaciones"><FaUmbrellaBeach Okayama style={{ fontSize: 30 }} /></div>
              {vacacion?.length>0?
               <div className="datos">
               <div className="verificacion">{verificacion(ultimaVacacion?.estadoFinal)}</div>
               <h5 className="vacaciones-item">
                 <b>Ultimas Vacaciones Solicitadas</b>
               </h5>
               <h5 className="vacaciones-item">
                 <b>Fecha de Solicitud: {ultimaVacacion?.fechaSolicitud}</b>
               </h5>
               <h5 className="vacaciones-item">
                 <b> Fecha de Salida: {ultimaVacacion?.fechaDesde} </b>
               </h5>
               <h5 className="vacaciones-item">
                 <b> Periodo: {ultimaVacacion?.periodo} </b>
               </h5>
             </div>
              
              : 
              <Tooltip title=" Vacaciones"><h2>No hay notificaciones!!!</h2></Tooltip>
              }
           
          </Card>
        </Col>
{/**Gastos */}
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card className="card-gasto" >
            <div className="gasto"> <FaRegMoneyBillAlt style={{ fontSize: 30 }}/> </div>
           
                {gasto?.length>0?
                   <div className="datos">
                   <div className="verificacion">{verificacion(ultimoGasto?.estadoFinal)}</div>
                   <h5 className="gasto-item">
                     <b>Ultima rendicion de gasto</b>
                   </h5>
                   <h5 className="gasto-item">
                     <b>Fecha de Solicitud: {ultimoGasto?.fecha}</b>
                   </h5>
                   <h5 className="gasto-item">
                     <b> Importe: {ultimoGasto?.importerendido} </b>
                   </h5>
                   <h5 className="gasto-item">
                     <b> Pago realizado: {ultimoGasto?.pagoRealizado} </b>
                   </h5>
                 </div>
                :
                <Tooltip title="rendicion de gasto"><h2>No hay notificaciones!!!</h2></Tooltip>
                }
              
          </Card>
        </Col>
{/** Km */}
        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
          <Card className="card-km">
            <div className="km"><AiFillCar style={{ fontSize: 30 }}/> </div>
            {km?.length>0?
            <div className="datos">

            <div className="verificacion">{verificacion(ultimoKm?.estadoFinal)}</div>
            <h5 className="km-item">
              <b>Ultima rendicion de KM</b>
            </h5>
            <h5 className="km-item">
              <b>Km total: {ultimoKm?.kmTotal}km</b>
            </h5>
            <h5 className="km-item">
              <b> Importe : ${ultimoKm?.importeTotal} </b>
            </h5>
            <h5 className="km-item">
              <b> Pago realizado: {ultimoKm?.procesoPagar} </b>
            </h5>
          </div>
            :
            <Tooltip title="rendicion de km"><h2>No hay notificaciones!!!</h2></Tooltip>
        }
            
          </Card>
        </Col>
      </Row>
    </>
  );
};
