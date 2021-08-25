import React, { useState, useEffect, useRef } from "react";
import {

  Row,
  Col,
} from "antd";

import { Card } from "antd";
import { TodosGastos } from "./helpers/funciones";
import { ColumnasKm } from "./columnas/columnasKm";
import "./css/aprob.css";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";

export const AprobacionKm = () => {
 const [columnasKm,data] = ColumnasKm();
// TodosGastos viene de helpers
  const datos = TodosGastos(data)?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      description: (
        <Row gutter={[10, 10]}>
          {f.rendicionKm.map((r) => (
            <>
              <Col xs={6} sm={4} md={4} lg={6} xl={6}>
                <Card
                  style={{
                    width: 200,
                    border: "solid 2px #ddd",
                    height: "auto",
                  }}
                >
                  <p>
                    <b>Fecha:</b> {r.fechaSelect}
                  </p>
                  <p>
                    <b> Km Inicial:</b> {r.KmI}
                  </p>
                  
                  <p>
                    <b>Km Final:</b> {r.KmF}
                  </p>
                  <p>
                    <b>Km Recorrido :</b> {r.KmRecorrido}
                  </p>
                  <p>
                    <b>Nota :</b> {r.nota}
                  </p>
                  <p>
                    <b>Importe :</b> ${r.importe}
                  </p>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      ),
    };
  });

 return  <HelperTABLEobj
 hoja={"Aprobaciones de Kilometros"}
    namefile={"Aprobaciones de Kilometros"}
 columns={columnasKm}
    data={datos}
    paginas={true}
    expandible={true}
    y={400}
 />
       
      
};
