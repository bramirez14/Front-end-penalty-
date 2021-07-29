import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Divider } from "antd";
import { useForm } from "../../hooks/useForm";
import { axiosURL } from "../../config/axiosURL";
import { Link } from "react-router-dom";
import { TablaKm } from "./TablaKm";
import { ModalKm } from "./ModalKm";
import { ImagenKm } from "./ImagenKm";

export const Kilometros = (history) => {
  const [stateKm, setStateKm] = useState([]);
  const [datosKm, setDatosKm] = useState([]);
  const id = localStorage.getItem('uid')
  const [values, handleInputChange, handleFileChange, handleChangePicker] =useForm({
    KmI:'',
    KmF:'',
    fechaSelect:'',
    usuarioId: id,
  });
  const[km,setKm] = useState({
    imagen:''
  })
  const {KmI,KmF,fecha}=values
  const restaKm = KmI==='' && KmF==='' ? '0 ': KmF-KmI;
  const totalImporte= restaKm==='0'?'Importe':restaKm*17
  const  peticionGet= async () => {
    const { data } = await axiosURL.get('/rendiciones/kilometros')
    setStateKm(data)
  }
  useEffect(() => {
    peticionGet();
  },[])

const filtroUsuario= stateKm.filter(s=>s.usuarioId===parseInt(id))
console.log(filtroUsuario);
const filtroSinKmId=filtroUsuario.filter(d=>d.kilometroId===null)
const idDB= filtroSinKmId?.map(i=>i.id)
console.log(idDB);
const importeDB=filtroSinKmId.map(i=>i.importe)
console.log(filtroSinKmId);
const kmRecorridos=filtroSinKmId.map(i=>i.KmRecorrido)
console.log(kmRecorridos);
const totalKmDB = kmRecorridos.reduce((acumulador, item) => {
return  (acumulador =(acumulador) + (item));
},0);
const importeTotalDB= importeDB.reduce((acumulador, item) => {
  return  (acumulador =(acumulador) + (item));
  },0);
  
   const handleClick= async() => {
     const f= new FormData();
     f.append('imagen',km.imagen)
      for (const d of idDB) {
        f.append('id',d)
      }
     f.append('kmTotal',totalKmDB)
     f.append('importeTotal',importeTotalDB)
     f.append('usuarioId',id)
     await axiosURL.post('/km',f);

     // history.push('/lista/kilometros')
   }
   const handleSubmit= async() =>{
    await axiosURL.post('/kilometros',{...values,KmRecorrido:restaKm,importe:totalImporte})
    peticionGet();
 }
 const borrar = async (id) => {
  console.log(id);
  await axiosURL.delete(`/borrar/rendicionKm/${id}`);
  peticionGet();
}
const style={
  borderRadius:10,background:'#46a461',border:'none',boxShadow:'none',color:'#ffff'
}
  return (
    <div style={{display:'flex',flexWrap:'nowrap'}}>
<Form
      layout="vertical"
      className="formulario-rendicion"
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
      <Form.Item>
        <Input.TextArea name="notas" placeholder="Nota" />
      </Form.Item>
      <Form.Item >
        <Button block style={{borderRadius:10}} htmlType="submit" >Agregar</Button>
      </Form.Item> 
      <Form.Item >
        <ModalKm title={'Finalizar'} state={km} setState={setKm} click={handleClick} boton={'Confirmar'} style={style} block={true}>
          <ImagenKm state={km} setState={setKm}/>
          </ModalKm>
      {/* <Button  > <Link to='/lista/kilometros'>Confirmar </Link>  </Button> */}
      </Form.Item>
    </Form>

    <TablaKm datos={filtroSinKmId} borrar={borrar} />
    </div>
    
  );
};
