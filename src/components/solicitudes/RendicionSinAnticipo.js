import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row, Card, Select, Divider } from "antd";

import TextArea from "antd/lib/input/TextArea";
import PeticionGET from "../../config/PeticionGET";
import axiosURL from "../../config/axiosURL";
import { categorias } from "../rendiciones/categorias";
import './css/rendicionSinAnticipo.css'
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
  });
  const {
    notas,
    importe,
    imagen,
    categoria,
    fecha,
    deleteId,
    usuarioId,
    formapagoId,
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

    let result = await axiosURL.post("/gasto/rendicion", f);
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

  /****fin imagenn  */
  /**Submit */
  /* let  handleSubmit
      if(imagen===''){
          alert('Debes Ingresar un comprabante visual')
          let clase=document.querySelector('custom-file-drop-area');
          clase.style.border-color='red'
        }else{ handleSubmit = () => {
            agregar();
          };} */

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
  console.log(crearRendicion);
  console.log(data);

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
          <h5 style={{ textAlign: "center"}}>Agregar Rendicion</h5>
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
              <div>

              </div>
       {/*  <Card
          hoverable
          style={{ width: " 500px", height: "400px"}}
          cover={
            <div className="custom-file-preview ">
              {data.length === 0 ? (
                <h2 style={{ marginLeft: "170px", marginTop: "170px" }}>
                  Imagen
                </h2>
              ) : (
                <div
                  className="prev-img"
                  style={{ width: " 500px", height: "350px" }}
                >
                  <span className="prev-img" onClick={handleDelete}>
                    &times;
                  </span>
                  <img src={data[0].src} />
                </div>
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
        </Card> */}

        <div className='vista-imagenes'   >
            <div className='vista-img' >
                 <div className="custom-file-preview ">
              {data.length === 0 ? (
                <h2 style={{ marginLeft: "170px", marginTop: "170px" }}>
                  Imagen
                </h2>
              ) : (
                <div
                  className="prev-img"
                  style={{ width: " 400px", height: "400px" }}
                >
                  <span className="prev-img" onClick={handleDelete}>
                    &times;
                  </span>
                  <img src={data[0].src} />
                </div>
              )}
            </div> 
            </div>
            <div className='vista-datos' > 
            <h5> Fecha: <span className='sp'>{fecha}</span></h5>
           <h5> Categoria: <span className='sp'>{categoria}</span></h5>
           <h5> Medio de pago: <span className='sp'>Efectivo</span></h5>
           <h5> Importe: <span className='sp'>{importe}</span></h5>
           <h5 className='h5' >  Nota: <p class="overflow-visible">{notas}</p>   </h5>

              
              </div>
        </div>
      </Row>
    </>
  );
};
