import React, { useState, useEffect } from "react";
import { axiosURL } from "../../config/axiosURL";
import { Form, Input, Button, Col, Row, Select, Divider, Spin } from "antd";
import "./css/editarRendicion.css";
import TextArea from "antd/lib/input/TextArea";
import { categorias } from "./categorias";
import { VistaImg } from "./VistaImg";
import { PeticionGET } from "../../config/PeticionGET";
import { Imagen } from "../img/Imagen";

export const EditarRendicion = ({ match, history }) => {
  const [spinner, setSpinner] = useState(false)
  const { id } = match.params;
  console.log(id);
  const [data, setData] = useState([]);
  const [img, setImg] = useState({image:''});
  const { Option } = Select;

  const [rendicionEditar, setRendicionEditar] = useState({
    notas: "",
    importe: "",
    categoria: "",
  });
  const { notas, importe, categoria, fecha, gastoId } = rendicionEditar;
  useEffect(() => {
    const peticionID = async () => {
      let res = await axiosURL.get(`/rendicion/${id}`);
      setRendicionEditar(res.data);
    };
    peticionID();
  }, [id]);

  const crearImg = async () => {
    setSpinner(true)
    editarRendicion();
    let f = new FormData();
    f.append("imagen", img.imagen);
    let result = await axiosURL.post(`/rendicion/gastos/img/${id}`, f);
    console.log(result);

    if(result.data?.error?.errno===-3008){
      alert('Compruebe su connexion!!!')
      setSpinner(false)
    }
    
    if (result.data.status===200) {
      history.push(`/lista/rendicion/${gastoId}`);
    }
  };
  const editarRendicion = async () => {
    await axiosURL.put(`/rendicion/gastos/${id}`, {
      ...rendicionEditar,
      total,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRendicionEditar({
      ...rendicionEditar,
      [name]: value,
    });
  };
  const onChange = (values) => {
    setRendicionEditar({
      ...rendicionEditar,
      categoria: values,
    });
  };

  /**Delte img del draw drop */
  const handleDelete = (e) => {
    setData([]);
    setImg({imagen:''});
  };
  /****fin imagenn  */
  /** Boton para volver atras */
  console.log(gastoId);
  const handleBack = () => history.push(`/lista/rendicion/${gastoId}`);
  const peticionGastoId = PeticionGET(`/gastos/${gastoId}`);
  const todasLasRendicones = peticionGastoId?.rendicion;
  const sumaGastos = todasLasRendicones?.map((sg) => sg.importe);
  const totalDeImporte = sumaGastos?.reduce((acumulador, item) => {
    return (acumulador = parseFloat(acumulador) + parseFloat(item));
  });
  const i = peticionGastoId?.importe;
  const peticionRendicion = PeticionGET(`/rendicion/${id}`);
  const resta = totalDeImporte - parseFloat(peticionRendicion.importe); //Es para verificar
  const total = resta + parseFloat(importe); //Declarado en el estado
  const handleSubmit = (e) => {
    crearImg();
  };
  return (
    <>
      <Row>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
         <Form
          onFinish={handleSubmit}
          onChange={handleChange}
          layout="vertical"
          className="formulario-rendicion"
        >
          <h4 style={{ textAlign: "center", marginLeft: "32px" ,marginTop:20}}>
            
            Editar Rendicion
            <Button className="btn-rendicion" onClick={handleBack} style={{marginLeft:20}}>
              
              X
            </Button>
          </h4>
          <Divider />
          <Form.Item label="Categoria">
            <Select value={categoria} onChange={onChange}>
              {categorias.map((c) => (
                <Option key={c.id} name="categoria" value={c.categoria}>
                  {c.categoria}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Importe" >
            <Input name="importe" value={importe} type='number' />
          </Form.Item>
          <Form.Item label="Fecha">
            <Input name="fecha" value={fecha} />
          </Form.Item>
          <Form.Item label="Notas">
            <TextArea
              name="notas"
              value={notas}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          
          <Imagen
            setData={setData}
            setState={setImg}
            state={img}
          />
            {/**imagen modo cel y ipad  */}{
              data.length> 0 &&
              <div className='img-muestra'> 
            <div className="custom-file-preview " >
              {data?.length === 0 ? (
                <h2 className='sector'>Imagen</h2>
              ) : (
                <div
                  className="prev-img"
                >
                  <span className="prev-img" onClick={handleDelete}>
                    &times;
                  </span>
                  <img src={data[0].src} />
                </div>
              )}
            </div>
        </div>}

          <Form.Item>
            <Button className="btn" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Col>

      <Col xs={16} sm={16} md={16} lg={16} xl={16}>
        {!!spinner?
       <Spin size="large" /> 
        : 
        <div className='vista-muestra'>
        <VistaImg
          data={data}
          setData={setData}
          handleDelete={handleDelete}
          {...rendicionEditar}
        />
      </div>
        }
      
        </Col>
       

        
      </Row>
    </>
  );
};
