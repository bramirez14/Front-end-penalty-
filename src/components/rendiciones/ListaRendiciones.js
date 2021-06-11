import React, { useContext } from "react";
import { Encabezado } from "./Encabezado";
import { Button, Col, Row } from "antd";
import { CardRendiciones } from "./CardRendiciones";
import { Link } from "react-router-dom";
import axiosURL from "../../config/axiosURL";
import PeticionGET from "../../config/PeticionGET";
import { SubEncabezado } from "./SubEncabezado";
import { UserContext } from "../../contexto/UserContext";
import { saveAs } from "file-saver";

export const ListaRendiciones = ({ match, history }) => {
  const { id } = match.params;
  const peticionGastoId = PeticionGET(`/gastos/${id}`);
  const todasLasRendicones = peticionGastoId?.rendicion;
  const sumaGastos = todasLasRendicones?.map((sg) => sg.importe);
  let totalDeImporte;
  if (sumaGastos?.length > 0) {
    totalDeImporte = sumaGastos?.reduce((acumulador, item) => {
      return (acumulador = parseFloat(acumulador) + parseFloat(item));
    });
  }
  const importe = peticionGastoId?.importe;
  const Text = useContext(UserContext);
  const { open } = Text;
  const handleClick = async () => {
    let res = await axiosURL.post("/generar/pdf", todasLasRendicones);
    if (res.status === 200) {
      let ge = await axiosURL.get("peticion/pdf", { responseType: "blob" });
      const pdfBlob = await new Blob([ge.data], { type: "application/pdf" });
      saveAs(pdfBlob, "penaltyIntranet.pdf");
    }
    /* axiosURL.post('/generar/pdf', todasLasRendicones)
     .then(() => axiosURL.get('peticion/pdf', { responseType: 'blob' }))
     .then((res) => {
       const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
       saveAs(pdfBlob, 'penaltyIntranet.pdf');
     }) */
  };
  console.log(peticionGastoId.sinAnticipo);
  const onClick = () => {
    if(peticionGastoId?.sinAnticipo!=='sin'){
    if (totalDeImporte >= importe) {
      alert("ya no podes seguir agregando ");
    } else {
      history.push(`/crear/rendicion/${id}`);
    }
  }else{
    history.push(`/crear/rendicion/${id}`);
  }
  };
  return (
    <div className="contenedor-form">
      <Encabezado />
      <SubEncabezado
        uuid={id}
        total={totalDeImporte}
        importeAnticipo={importe}
      />
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Button style={{ marginTop: "10px" }} onClick={onClick}>
            {" "}
            Agregar Gasto
          </Button>{" "}
          <Link to="/gastos">
            <Button className="btn-list-rendicion">X</Button>
          </Link>
          {todasLasRendicones?.map((t) => (
            <CardRendiciones
              key={t.id}
              {...t}
              uid={id}
              importeAnt={totalDeImporte}
            />
          ))}
        </Col>
        <Col offset={21}>
          <Button style={{ marginTop: "10px" }} onClick={handleClick}>
            {" "}
            Generate Pdf
          </Button>
        </Col>
      </Row>
    </div>
  );
};
