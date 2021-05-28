import React, { useState} from "react";
import axiosURL from "../../config/axiosURL";
import { Form, Input, Button, Row, Select, Divider } from "antd";
import "./css/editarRendicion.css";
import TextArea from "antd/lib/input/TextArea";
import PeticionGET from "../../config/PeticionGET";
import { categorias } from "./categorias";
import { VistaImg } from "./VistaImg";

export const CrearRendicion = ({ match, history }) => {
  const { id } = match.params;

  const { Option } = Select;
  const [highlight, setHighlight] = useState(false);
  const [data, setData] = useState([]);
  const [crearRendicion, setCrearRendicion] = useState({
    fecha: new Date().toLocaleDateString(),
    notas: "",
    importe: "",
    imagen: "",
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
    let f = new FormData();
    f.append("imagen", imagen);
    f.append("importe", importe);
    f.append("categoria", categoria);
    f.append("notas", notas);
    f.append("fecha", fecha);
    f.append("gastoId", gastoId);

    let result = await axiosURL.post("/rendicion", f);
    console.log(result.data);
    if (result.data) {
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
  const totalDeImporte = sumaGastos?.reduce((acumulador, item) => { return acumulador = parseFloat(acumulador) + parseFloat(item) })
  const i = peticionGastoId?.importe
  const total = parseFloat(totalDeImporte) + parseFloat(importe)


  /**Submit */
  const handleSubmit = () => {
    if (total > i) {
      alert('El importe no puede  superar el monto del anticipo ')
    } else {
      agregar();
    }
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
          <h5 style={{ textAlign: "center", marginLeft:'40px' }}> Agregar Rendicion <Button className='btn-rendicion' onClick={handleBack}> X </Button></h5>
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
        <VistaImg
          data={data}
          setData={setData}
          handleDelete={handleDelete}
          {...crearRendicion} />

      </Row>
    </>
  );
};
