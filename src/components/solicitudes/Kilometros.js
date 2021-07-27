import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Divider } from "antd";
import { useForm } from "../../hooks/useForm";
import { postData } from "./helpers/funciones";
import { axiosURL } from "../../config/axiosURL";

export const Kilometros = () => {
  const [values, handleInputChange, handleFileChange, handleChangePicker] =useForm({
    KmI:'',
    KmF:'',
    fecha:'',
  });
  const {KmI,KmF,fecha}=values
  const restaKm = KmI==='' && KmF==='' ? '0 ': `${KmF-KmI}`;
  const totalImporte= restaKm==='0'?'Importe':restaKm*17
   const handleSubmit= async() =>{
     console.log(values);
    const f=  new FormData();
    f.append('KmI',KmI);
    f.append('KmF',KmF);
    f.append('fecha', fecha);
     await axiosURL.post('/todos/kilometros',values)
  }



  return (
    <Form
      layout="vertical"
      className="formulario-rendicion-crear"
      size="large"
      onChange={handleInputChange}
     onFinish={handleSubmit}
    >
      <h4 style={{ textAlign: "center", marginLeft: "20px" }}>
        Agregar Rendicion de KM
        <Button className="btn-rendicion" style={{ marginLeft: 10 }}>
          X
        </Button>
      </h4>
      <Divider />
      <Form.Item>
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Ingrese una fehca"
          onChange={handleChangePicker}
          name="fecha"
        />
      </Form.Item>
      <Form.Item>
        <Input type='number' name="KmI" placeholder="Km Inicial" min={0} />
      </Form.Item>
      <Form.Item>
        <Input type='number' name="KmF" placeholder="Km Final" min={0} />
      </Form.Item>
      <Form.Item >
        <Input value={`${restaKm} Km`} disabled />
      </Form.Item>
      <Form.Item >
        <Input  value={` $${totalImporte}`} disabled />
      </Form.Item>
      <Form.Item >
        <Button block style={{borderRadius:10}} htmlType="submit" >Agregar</Button>
      </Form.Item> 
      {/* <Form.Item >
      <Button  block style={{borderRadius:10,background:'#46a461',border:'none',boxShadow:'none',color:'#ffff'}}>Confirmar</Button>
      </Form.Item> */}
    </Form>
  );
};
