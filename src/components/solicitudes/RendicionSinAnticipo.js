import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row, Card, Select, Divider, notification } from "antd";

import TextArea from "antd/lib/input/TextArea";
import PeticionGET from "../../config/PeticionGET";
import axiosURL from "../../config/axiosURL";
import { categorias } from "../rendiciones/categorias";
import { VistaImg } from "../rendiciones/VistaImg";
export const RendicionSinAnticipo = ({ history }) => {
  const id = localStorage.getItem("uid");

  const { Option } = Select;
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState([]);
  const [crearRendicion, setCrearRendicion] = useState({
    fecha: new Date().toLocaleDateString(),
    notas: "",
    importe: "",
    imagen: "",
    categoria: "",
    deleteId: [],
    usuarioId: id,
    formapagoId: "1",
    sinAnticipo:"sin",
    estado:'aprobado',
    estadoFinal:'aprobado',
    notificacion:'inactiva'
    
  });
  const {
    notas,
    importe,
    imagen,
    categoria,
    fecha,
    usuarioId,
    formapagoId,
    sinAnticipo,
    estado,
    estadoFinal,
    notificacion,
  } = crearRendicion;
  const { Meta } = Card;
  const agregar = async () => {
    let f = new FormData();
    f.append("imagen", imagen);
    f.append("importe", importe);
    f.append("categoria", categoria);
    f.append("notas", notas);
    f.append("fecha", fecha);
    f.append("usuarioId", usuarioId);
    f.append("formapagoId", formapagoId);
    f.append('sinAnticipo',sinAnticipo);
    f.append('estado',estado);
    f.append('estadoFinal',estadoFinal)
    f.append('notificacion',notificacion)

    let result = await axiosURL.post("/gasto/rendicion", f );
    if (result.data) {
      history.push("/gastos");
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
      ...crearRendicion,
      categoria: value,
    });
  };
  const peticionMedioDePago = PeticionGET("/mpagos");

  /*******imagen */

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    console.log(file);
    handFiles(file);
  };
  const handFiles = (file) => {
    let imageArr = [];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileObj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      imageArr.push(fileObj);
      setData(imageArr);
      setCrearRendicion({
        ...crearRendicion,
        imagen: file,
      });
    });
  };
  const handleHighLight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };
  const handleUnhiglight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    setHighlight(false);
    handFiles(files);
  };
  /**Delte img del draw drop */
  const handleDelete = (e) => {
    setData([]);
    setCrearRendicion({
      ...crearRendicion,
      imagen: "",
    });
  };

  const handleSubmit = () => {
    if (imagen === "") {
      alert("Debes adjuntar una imagen");
    } else {
      agregar();
    }
  };

  /**Fin Submit */
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
const handleBack=()=> history.push("/gastos");



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
       
         <h5 style={{ textAlign: "center",marginLeft:'40px'}}> Agregar Rendicion <Button className='btn-rendicion' onClick={handleBack}> X </Button></h5> 
          
          <Divider/>
          <Form.Item
            name="categoria"
            rules={[
              {
                required: true,
                message: "ingrese un categoria",
              },
            ]}
          >
            <Select placeholder="Categoria" onChange={selectChange}>
              {categorias.map((c) => (
                <Option key={c.id} value={c.categoria}>
                  {c.categoria}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="formapagoId">
            <Input name="formapagoId" placeholder="Efectivo" disabled />
          </Form.Item>
          <Form.Item
            name="importe"
            rules={[
              {
                required: true,
                message: "ingrese un importe",
              },
            ]}
          >
            <Input name="importe" placeholder="Importe" />
          </Form.Item>

          <Form.Item name="notas">
            <TextArea name="notas" value={notas} placeholder="Nota" autoSize={{ minRows: 2, maxRows: 6 }}/>
          </Form.Item>

          <div className="custom-form-group">
            <div
              className={
                highlight
                  ? "custom-file-drop-area highlight"
                  : "custom-file-drop-area"
              }
              onDragEnter={handleHighLight}
              onDragOver={handleHighLight}
              onDragLeave={handleUnhiglight}
              onDrop={handleDrop}
            >
              <input
                type="file"
                name="photos"
                placeholder="Enter photos"
                multiple
                id="filephotos"
                onChange={handleFileChange}
              />
              <label htmlFor="filephotos">
                {" "}
                <h1> + </h1>{" "}
              </label>
            </div>
          </div>
          <Form.Item>
            <Button className="btn" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
             
       <VistaImg data={data}
       setData={setData}
       handleDelete={handleDelete} 
       {...crearRendicion}
       medio='Medio de pago: '
       pago='Efectivo'/>

        
      </Row>
    </>
  );
};
