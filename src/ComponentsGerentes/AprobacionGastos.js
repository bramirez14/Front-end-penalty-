import React from "react";
import {

  Row,
  Col,
} from "antd";
import { Card, } from "antd";
import "./css/aprob.css";
import { TodosGastos } from "./helpers/funciones";
import { ColumnasGastos } from "./columnas/columnasGastos";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";
export const AprobacionGastos = () => {
const [columnasGastos,data]=ColumnasGastos();

// TodosGastos viene de helpers
  const datos = TodosGastos(data)?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      description: (
        <Row gutter={[10, 10]}>
          {f.rendicion.map((r) => (
            <>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <Card
                  style={{
                    width: 200,
                    border: "solid 2px #ddd",
                    height: "auto",
                  }}
                >
                  <img
                    style={{ width: 100, height: 100 }}
                    alt="example"
                    src={r.imagen}
                  />
                  <p>
                    <b>Fecha:</b> {r.fecha}
                  </p>
                  <p>
                    <b>Categoria:</b> {r.categoria}
                  </p>
                  <p>
                    <b>Importe:</b> ${r.importe}
                  </p>
                  <p>
                    <b>Nota:</b> {r.notas}
                  </p>
                </Card>
              </Col>
            </>
          ))}
        </Row>
      ),
    };
  });
  return <HelperTABLEobj
      hoja={"Aprobaciones de Gastos"}
      namefile={"Aprobaciones de Gastos"}
      columns={columnasGastos}
      data={datos}
      expandible={true}
      boton={true}
      paginas={true}
      bordered={false}
      y={400}
      />
      
      
};
