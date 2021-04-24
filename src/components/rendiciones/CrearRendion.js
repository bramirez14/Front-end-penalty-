import React, { useState, useEffect } from "react";
import axiosURL from "../../config/axiosURL";
import { Form, Input, Button, Col, Row, Card, Select } from "antd";

import "./css/editarRendicion.css";
import TextArea from "antd/lib/input/TextArea";
import PeticionGET from "../../config/PeticionGET";
import { SelectAnt } from "../inputs/SelectAnt";
export const CrearRendion = ({ match, history }) => {
  let id = JSON.parse(localStorage.getItem("id"));
  console.log(id);
  const { Option } = Select;
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState();
  const [rendicionEditar, setRendicionEditar] = useState({
    notas: "",
    importe: "",
    imagen: "",
    categoria: "",
    usuarioId: id,
    deleteId: [],
    fecha: new Date().toLocaleDateString(),
    formapagoId: "",
  });
  const {
    notas,
    importe,
    imagen,
    categoria,
    fecha,
    usuarioId,
    deleteId,
    formapagoId,
  } = rendicionEditar;
  const { Meta } = Card;
  console.log(fecha);

  const crearRendicion = async () => {
    let f = new FormData();
    f.append("imagen", rendicionEditar.imagen);
    f.append("importe", importe);
    f.append("categoria", categoria);
    f.append("notas", notas);
    f.append("usuarioId", usuarioId);
    f.append("fecha", fecha);
    f.append("formapagoId", formapagoId);


    let result = await axiosURL.post("/rendiciones/gastos", f);
    console.log(result.data);
    if (result.data) {
      history.push("/gastos");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRendicionEditar({
      ...rendicionEditar,
      [name]: value,
    });
  };
  const onChange = (value) => {
    setRendicionEditar({...rendicionEditar,formapagoId:value})
  };
  const onSearch = (val) => {
    setRendicionEditar({...rendicionEditar,formapagoId:val})
  };

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
      setRendicionEditar({
        ...rendicionEditar,
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
    setRendicionEditar({
      ...rendicionEditar,
      imagen: imagen,
      deleteId: deleteId == undefined ? [deleted] : [...deleteId, deleted],
    });
  };

  /****fin imagenn  */
  /**Submit */
  const handleSubmit = () => {
    crearRendicion();
  };
  /**Fin Submit */
  /**peticio get de forma de pago */
  let getFpago = PeticionGET("/mpagos");
  console.log(getFpago);
  /**fin peticion get forma de pago */
  console.log(rendicionEditar);

  return (
    <>
      <Row style={{}}>
        <Col xs={24} sm={24} md={6} lg={8} xl={8} xxl={8}>
          <Form
            onFinish={handleSubmit}
            onChange={handleChange}
            layout="vertical"
            className="rendicion"
            style={{ width: "400px" }}
          >
            <Form.Item name="importe">
              <Input name="importe" placeholder="Importe" />
            </Form.Item>
            <Form.Item>
              <Select
                showSearch
                placeholder="Medio de pago"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                  {getFpago.map( g=>(
                <Option key ={g.id} value={g.id}>{g.pago}</Option>
                ))}
               
              </Select>
            </Form.Item>
            <Form.Item name="categoria">
              <Input
                name="categoria"
                value={categoria}
                placeholder="Categoria"
              />
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
              <Button className='btn' htmlType="submit" block>
                Guardar
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Card
          hoverable
          style={{ width: " 500px", height: "auto", margin: "auto" }}
          cover={
            <div className="custom-file-preview ">
              {data === undefined ? (
                <h2>Agregue una imagen</h2>
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
