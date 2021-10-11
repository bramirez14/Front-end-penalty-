import React, { useEffect, useState} from "react";
import{ axiosURL} from "../../config/axiosURL";
import { Form, Input, Button,  Select, Divider,} from "antd";
import "./css/editarRendicion.css";
import "../solicitudes/css/anticipoGasto.css";

import TextArea from "antd/lib/input/TextArea";
import {PeticionGET} from "../../config/PeticionGET";
import { categorias } from "./categorias";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { Files } from "../../helpers/Files";

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
    categoria: "",
  });
  
  const {
    importe,
    fecha,
  } = crearRendicion;

  console.log(spinner,'soy el spinner');
  
 
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
  const handleSubmit = async (values) => {
    console.log(values);
    setSpinner(true)
  
      let f = new FormData();
      f.append("file", values.file?.[0]?.originFileObj);
      f.append("importe", values.importe);
      f.append("categoria", values.categoria);
      f.append("nota", values.nota);
      f.append("fecha", fecha);
      f.append("gastoId", id);
      f.append("total",total);

      let result = await axiosURL.post("/rendicion", f);
   console.log(result);
      if(result.data?.error?.errno===-3008){
        alert('Compruebe su connexion!!!')
        setSpinner(false)
      }
      
      if (result.data.status===200) {
       history.push(`/lista/rendicion/${id}`);
      }
   
  };
  /**Fin Submit */
  console.log(crearRendicion);
  return (
    <>
<>{
  
  !!spinner?
 <BeatLoader olor={color}  css={override} size={20}  />
 :

        <Form
          onFinish={handleSubmit}
          onChange={handleChange}
          className='form-complete'
          layout="vertical"
          
          {...estilo}
          size='large'
        >
          <h4 style={{ textAlign: "center", marginLeft:'40px' }}> Agregar Rendiciones 
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

          <Form.Item name="nota"
          hasFeedback
          >
            <TextArea  placeholder="Nota" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
        
         <Files obli={crearRendicion.categoria==='Peajes'?true:false}/>     

          
          <Form.Item>
            <Button className="btn" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      
       
        
       
     
     
     }</>
      
      
      
      


    </>
  );
};
