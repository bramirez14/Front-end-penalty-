import React, { useEffect, useState} from "react";
import{ axiosURL} from "../../config/axiosURL";
import { Form, Input, Button, Row, Select, Divider } from "antd";
import "./css/editarRendicion.css";
import TextArea from "antd/lib/input/TextArea";
import {PeticionGET} from "../../config/PeticionGET";
import { categorias } from "./categorias";
import { VistaImg } from "./VistaImg";
import { Imagen } from "../img/Imagen";

export const CrearRendicion = ({ match, history }) => {
  const { id } = match.params;
  const { Option } = Select;
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState([]);
  const [crearRendicion, setCrearRendicion] = useState({
    fecha: new Date().toLocaleDateString(),
    notas: "",
    importe: "",
    imagen:"",
    categoria: "",
    gastoId: id,
  });
  
  const {
    notas,
    importe,
    imagen,
    categoria,
    fecha,
    gastoId,
  } = crearRendicion;

  
  const agregar = async () => {
  const obj={
    f: new Date().toLocaleString(),
  }
      let f = new FormData();
     
      f.append("imagen", imagen);
      f.append("importe", importe);
      f.append("categoria", categoria);
      f.append("notas", notas);
      f.append("fecha", fecha);
      f.append("gastoId", gastoId);
      f.append("total",total);
      f.append('f',obj.f)

      let result = await axiosURL.post("/rendicion", f);
      console.log(result.data);
      if (result.status===200) {
        history.push(`/lista/rendicion/${id}`);
      }
   
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrearRendicion({
      ...crearRendicion,
      [name]: value,
    });
  };
  const selectChange = (value) => {
    setCrearRendicion({
      ...crearRendicion, categoria: value
    })
  }
 
  /**Delte img del draw drop */
  const handleDelete = (e) => {
    setData([]);
    setCrearRendicion({
      ...crearRendicion,
      imagen: "",
    });
  };
  /****fin imagenn  */

  /**peticio get de forma de pago */
  let getFpago = PeticionGET("/mpagos");
  /**fin peticion get forma de pago */
  const estilo = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24,
    xxl: 24,
  };
  const handleBack = () => history.push(`/lista/rendicion/${id}`);
  const peticionGastoId = PeticionGET(`/gastos/${id}`)
  const todasLasRendicones = peticionGastoId?.rendicion
  const sumaGastos = todasLasRendicones?.map(sg => sg.importe)
  let totalDeImporte;
  if (sumaGastos?.length > 0) {
    totalDeImporte = sumaGastos?.reduce((acumulador, item) => {
      return (acumulador = parseFloat(acumulador) + parseFloat(item));
    });
  }
  const i = peticionGastoId?.importe
  const total = parseFloat(totalDeImporte) + parseFloat(importe)
 console.log(totalDeImporte);


console.log(crearRendicion);
  /**Submit */
  const handleSubmit = () => {
    if(peticionGastoId?.sinAnticipo!=='sin'){
      agregar(); 
    }else{agregar()}
  };
  /**Fin Submit */
  return (
    <>
      <Row>
        <Form
          onFinish={handleSubmit}
          onChange={handleChange}
          layout="vertical"
          className="formulario-rendicion-crear"
          {...estilo}
          size='large'
        >
          <h4 style={{ textAlign: "center", marginLeft:'40px' }}> Agregar Rendicion 
          <Button className='btn-rendicion' onClick={handleBack} style={{marginLeft:20}}> X </Button></h4>
          <Divider />
          <Form.Item name="categoria">
            <Select placeholder="Categoria" onChange={selectChange} >
              {categorias.map((c) => (
                <Option key={c.id} value={c.categoria}>
                  {c.categoria}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="importe">
            <Input name="importe" placeholder="Importe" />
          </Form.Item>

          <Form.Item name="notas">
            <TextArea name="notas" value={notas} placeholder="Nota" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
        <Imagen 
          
            setData={setData}
            setState={setCrearRendicion}
            state={crearRendicion}
          />

          
          <Form.Item>
            <Button className="btn" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
        <VistaImg
          data={data}
          setData={setData}
          handleDelete={handleDelete}
          {...crearRendicion} />

      </Row>
    </>
  );
};
