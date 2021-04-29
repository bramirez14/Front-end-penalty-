import React, { useState, useEffect } from "react";
import axiosURL from "../../config/axiosURL";
import { Form, Input, Button, Col, Row, Card, Select, Divider } from "antd";

import "./css/editarRendicion.css";
import TextArea from "antd/lib/input/TextArea";
import PeticionGET from "../../config/PeticionGET";
import { SelectAnt } from "../inputs/SelectAnt";
import { categorias } from "./categorias";
export const CrearRendicion = ({ match, history }) => {
  const { id } = match.params;


  const { Option } = Select;
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState();
  const [crearRendicion, setCrearRendicion] = useState({
    fecha: new Date().toLocaleDateString(),
    notas: "",
    importe: "",
    imagen: "",
    categoria: "",
    gastoId: id,
    deleteId: [],
  });
  const {
    notas,
    importe,
    imagen,
    categoria,
    fecha,
    gastoId,
    deleteId,
  } = crearRendicion;
  const { Meta } = Card;

  const agregar = async () => {
    let f = new FormData();
    f.append("imagen", imagen);
    f.append("importe", importe);
    f.append("categoria", categoria);
    f.append("notas", notas);
    f.append("fecha", fecha);
    f.append("gastoId",gastoId);

    let result = await axiosURL.post("/rendicion", f);
    console.log(result.data);
    /* if (result.data) {
      history.push("/gastos");
    } */
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrearRendicion({
      ...crearRendicion,
      [name]: value,
    });
  };
  const selectChange=(value)=>{
    setCrearRendicion({
      ...crearRendicion,categoria:value
    })
  }
  

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
    let deleted = [];
    let target = e.target.parentElement;
    let targetindex = target.dataset.imgindex * 1;
    deleted.push(imagen[targetindex]?.id);
    setData([...data.slice(0, targetindex), ...data.slice(targetindex + 1)]);
    setCrearRendicion({
      ...crearRendicion,
      imagen: imagen,
      deleteId: deleteId == undefined ? [deleted] : [...deleteId, deleted],
    });
  };

  /****fin imagenn  */
  /**Submit */
  const handleSubmit = () => {
    agregar();
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
  console.log(crearRendicion);
  return (
    <>
      <Row>
        <Form
          onFinish={handleSubmit}
          onChange={handleChange}
          layout="vertical"
          className="formulario-rendicion"
          {...estilo}
        >
          <h5 style={{ textAlign: "center" }}>Agregar Rendicion</h5>
          <Divider style={{}} />
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
            <TextArea name="notas" value={notas} placeholder="Nota" />
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

        <Card
          hoverable
          style={{ width: " 500px", height: "auto", margin: "auto" }}
          cover={
            <div className="custom-file-preview ">
              {data === undefined ? (
                <h2 style={{marginLeft:'170px',marginTop:'170px'}}>Imagen</h2>
              ) : (
                data.map((item, index) => (
                  <div
                    className="prev-img"
                    key={index}
                    data-imgindex={index}
                    style={{ width: " 500px", height: "350px" }}
                  >
                    <span className="prev-img" onClick={handleDelete}>
                      {" "}
                      &times;
                    </span>
                    <img
                      src={item.id ? item.image : item.src}
                      alt={item.name}
                    />
                  </div>
                ))
              )}
            </div>
          }
        >
          <Meta
            title="Datos:"
            description={
              <div>
                <h6>
                  {" "}
                  <b>Categoria:</b> {categoria}
                </h6>
                <h6 className="h6">
                  <b>Nota: </b> {notas}
                </h6>
                <h6 className="h6">
                  {" "}
                  <b>Importe:</b> ${importe}
                </h6>
                <h6 className="h6">
                  <b>Fecha:</b> {fecha}
                </h6>
              </div>
            }
          />
        </Card>
      </Row>
    </>
  );
};
