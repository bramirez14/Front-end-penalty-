import React from "react";
import {
  Row,
  Col,
  Descriptions,
  Button,
  Image,
} from "antd";
import { descargarPDF, TodosGastos } from "./helpers/funciones";
import { ColumnasKm } from "./columnas/columnasKm";
import "./css/aprob.css";
import { HelperTABLEobj } from "../helpers/HelperTABLEobj";
import { colKmExcel } from "./columnas/columnasExcel/columnasKmExcel";
import { BiDownload } from "react-icons/bi";

export const AprobacionKm = () => {
 const [columnasKm,data] = ColumnasKm();
// TodosGastos viene de helpers
  const datos = TodosGastos(data)?.map((f) => {
    return {
      ...f,
      key: f.id,
      nombre: f.usuario.nombre,
      apellido: f.usuario.apellido,
      description:(

<Descriptions title={`Info ${f.id}`} style={{border:' solid 2px #ddd', padding:20}}>
      <Descriptions.Item label="Importe Total"><b>${f.importeTotal}</b></Descriptions.Item>
      <Descriptions.Item label="Km Total"><b>{f.kmTotal}km</b></Descriptions.Item>
      <Descriptions.Item label="Imagen"><Image
      width={70}
      height={70}
      src={f.imagen}
    />
    </Descriptions.Item>
      <Descriptions.Item label="PDF proveedores">
      {
      f.pdf === null? <h5>No hay pdf!!!</h5>:
      <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(f.pdf)}>
          <BiDownload/>
          </Button>
    }
      </Descriptions.Item>
      <Descriptions.Item label="PDF pagos">
      {
      f.pdfinal === null? <h5>No hay pdf!!!</h5>:
      <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(f.pdfinal)}>
          <BiDownload/>
          </Button>
    }
      </Descriptions.Item>
      <Descriptions.Item label="PDF orden de pago final">
      {
      f.pdfpagoFinal === null? <h5>No hay pdf!!!</h5>:
      <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(f.pdfpagoFinal)}>
          <BiDownload/>
          </Button>
    }
      </Descriptions.Item>
    </Descriptions>

    )
    };
  });

 return  <HelperTABLEobj
 hoja={"Aprobaciones de Kilometros"}
    namefile={"Aprobaciones de Kilometros"}
 columns={columnasKm}
    data={datos.reverse()}
    paginas={true}
    expandible={true}
    bordered={false}
    y={400}
    colExcel={colKmExcel}
 />
       
      
};
