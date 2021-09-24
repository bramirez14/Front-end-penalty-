import React, { useEffect, useState} from "react";
import{ axiosURL} from "../../config/axiosURL";
import { Form, Input, Button, Row, Select, Divider,Col,Card } from "antd";
import "./css/editarRendicion.css";
import "../solicitudes/css/anticipoGasto.css";

import TextArea from "antd/lib/input/TextArea";
import {PeticionGET} from "../../config/PeticionGET";
import { categorias } from "./categorias";
import { VistaImg } from "./VistaImg";
import { Imagen } from "../img/Imagen";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import {CardImgResponse} from './CardImgResponse'
import {CardImg} from './CardImg'

const override = css`
  display: flex;
  margin: 700px 300px;
  
  @media (max-width: 768px) {
    display:flex;
    margin: 70px 220px;
    width:70px;
    
  }
  @media (max-width: 480px) {
    display:flex;
    margin: 100px 120px;
    width:70px;
  }
}
`;
export const CrearRendicion = ({ match, history }) => {
  let [color, setColor] = useState('#46a461');
  const [spinner, setSpinner] = useState(false)
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

  console.log(spinner,'soy el spinner');
  
  const agregar = async () => {
   setSpinner(true)
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
      if(result.data?.error?.errno===-3008){
        alert('Compruebe su connexion!!!')
        setSpinner(false)
      }
      
      if (result.data.status===200) {
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
  }else{
    totalDeImporte=0
  }
  const i = peticionGastoId?.importe
  const total = parseFloat(totalDeImporte) + parseFloat(importe)
 console.log(total);


  /**Submit */
  const handleSubmit = () => {
    if(peticionGastoId?.sinAnticipo!=='sin'){
      agregar(); 
    }else{agregar()}
  };
  /**Fin Submit */
  return (
    <>
<Card className="formulario-rendicion-crear" style={{padding:20}}>
<div style={{border:'solid 1px #ddd',padding:20,borderRadius:10,height:'auto'}}>
<>{
  
  !!spinner?
 <BeatLoader olor={color}  css={override} size={20}  />
 :
      <Row gutter={20}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}> 

        <Form
          onFinish={handleSubmit}
          onChange={handleChange}
          className='formulario'
          layout="vertical"
          
          {...estilo}
          size='large'
        >
          <h4 style={{ textAlign: "center", marginLeft:'40px' }}> Agregar Rendicion 
          <Button className='btn-rendicion' onClick={handleBack} style={{marginLeft:20}}> X </Button></h4>
          <Divider />
          <Form.Item name="categoria"
          hasFeedback
          >
            <Select placeholder="Categoria" onChange={selectChange} >
              {categorias.map((c) => (
                <Option key={c.id} value={c.categoria}>
                  {c.categoria}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="importe"
          hasFeedback
          >
            <Input name="importe" placeholder="Importe" type='number'/>
          </Form.Item>

          <Form.Item name="notas"
          hasFeedback
          >
            <TextArea name="notas" value={notas} placeholder="Nota" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
        
         
        <Imagen 
            setData={setData}
            setState={setCrearRendicion}
            state={crearRendicion}
          />
         
         {/**imagen modo cel y ipad  */}
             
            {
              data.length> 0 &&
              <div className='img-muestra'> 

          
                 <CardImgResponse
                 data={data}
                 />
        </div>}

          
          <Form.Item>
            <Button className="btn" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
        </Col>
      
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
      <div className='vista-muestra'>
        
            <CardImg  data={data}
            setData={setData}
            handleDelete={handleDelete}
            {...crearRendicion
         } />
        
      
        </div>
        
        </Col>

      </Row>
     
     
     }</>
      </div>
      
      
      
      

</Card>

    </>
  );
};
