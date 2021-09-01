import React, { useState, useEffect,useContext } from "react";
import { Form, Input, DatePicker, Button, Divider } from "antd";
import { useForm } from "../../hooks/useForm";
import { axiosURL } from "../../config/axiosURL";
import { Link } from "react-router-dom";
import { TablaKm } from "./TablaKm";
import { ModalKm } from "./ModalKm";
import { ImagenKm } from "./ImagenKm";
import { Spin,} from 'antd';
import './css/spiner.css'
import './css/kilometros.css'

import Swal from 'sweetalert2'
import { PeticionGET } from "../../config/PeticionGET";
import { alerta } from "../solicitudes/helpers/funciones";
import { SocketContext } from "../../context/SocketContext";

export const Kilometros = ({history}) => {
const {socket} = useContext(SocketContext)

  const dateFormat = 'DD/MM/YYYY';
  const [loading, setLoading] = useState(false)
  const [stateKm, setStateKm] = useState([]);
  const [datosKm, setDatosKm] = useState([]);
  const [datePicker, setDatePicker] = useState('')
  const id = localStorage.getItem('uid')
  const datosUsuario= PeticionGET(`/${id}`)
  const [values, handleInputChange,reset] =useForm({
    KmI:'',
    KmF:'',
    usuarioId: id,
    nota:'',
  });
  const[km,setKm] = useState({
    imagen:''
  })
  const handleChangePicker = (date, dateString)=>{
    setDatePicker( dateString)
}
const precioKM= PeticionGET('/precio/km')
console.log(parseFloat(precioKM[0]?.precio));
  const {KmI,KmF,nota,fechaSelect}=values
  const restaKm = KmI==='' && KmF==='' ? '0 ': parseFloat(KmF) - parseFloat(KmI);
  console.log(restaKm);
  console.log(parseFloat(KmF) > parseFloat(KmI));
  const totalImporte= restaKm==='0'?'Importe':restaKm*( parseFloat(precioKM[0]?.precio))//debe venir de la db
  const  peticionGet= async () => {
    const { data } = await axiosURL.get('/rendiciones/kilometros')
    setStateKm(data)
  }
  useEffect(() => {
    peticionGet();
  },[])

const filtroUsuario= stateKm.filter(s=>s.usuarioId===parseInt(id))
const filtroSinKmId=filtroUsuario.filter(d=>d.kilometroId===null)
const idDB= filtroSinKmId?.map(i=>i.id)
const importeDB=filtroSinKmId.map(i=>i.importe)
const kmRecorridos=filtroSinKmId.map(i=>i.KmRecorrido)
const totalKmDB = kmRecorridos.reduce((acumulador, item) => {
return  (acumulador =(acumulador) + (item));
},0);
const importeTotalDB= importeDB.reduce((acumulador, item) => {
  return  (acumulador =(acumulador) + (item));
  },0);
  const handleSubmit= async() =>{
    if(parseFloat(KmF)< parseFloat(KmI)){
      Swal.fire(
        ' Km final debe ser mayor a  Km inicial',
      )
    }else{
      await axiosURL.post('/kilometros',{...values,KmRecorrido:restaKm,importe:totalImporte,fechaSelect:datePicker})
      peticionGet();
        reset()
    }

 }
   const handleConfirm= async() => {
     const obj={
      f: new Date().toLocaleString(),
     }
     const objs={
      alerta:'Se visiualizaran en la descripcion',
      info:'Tenes un Rendicion de Kilometro',
     nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
     f: new Date().toLocaleString(),
     estado:'activa',
      path:'/aprobacion/km',
      emisor:datosUsuario.email,
      receptor:datosUsuario.gerente.email,
      usuarioId:datosUsuario.id
     }
socket.emit('alerta-nueva',obj)
    setLoading(true)
     const f= new FormData();
     f.append('imagen',km.imagen)
      for (const d of idDB) {
        f.append('id',d)
      }
     f.append('kmTotal',totalKmDB)
     f.append('importeTotal',importeTotalDB)
     f.append('usuarioId',id)
     f.append('f',obj.f)

    const resp= await axiosURL.post('/km',f);
    console.log(resp);
    
    if(resp.status===200){
      history.push('/lista/kilometros')
      setLoading(false)
    }
     
   }

 const borrar = async (id) => {
  await axiosURL.delete(`/borrar/rendicionKm/${id}`);
  peticionGet();
}
const style={
  borderRadius:10,background:'#46a461',border:'none',boxShadow:'none',color:'#ffff',marginTop:20
}
console.log(values);
  return (
    <div style={{display:'flex',flexWrap:'nowrap'}}>
<Form
      layout="vertical"
      className="formulario-rendicion"
      size="large"
      onChange={handleInputChange}
     onFinish={handleSubmit}
     id='formulario'
    >
      <h4 style={{ textAlign: "center", marginLeft: "20px" }}>
        Agregar Rendicion de KM
        <Button className="btn-rendicion" style={{ marginLeft: 10 }} >
          <Link to='/lista/kilometros'> X </Link>
        </Button>
      </h4>
      <Divider />
      <Form.Item >
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Ingrese una fecha"
          onChange={handleChangePicker}
          name="fecha"
          format={dateFormat}
          
        />
      </Form.Item>
      <Form.Item>
        <Input type='number' name="KmI" placeholder="Km Inicial" min={0} value={KmI}/>
      </Form.Item>
      <Form.Item>
        <Input type='number' name="KmF" placeholder="Km Final" min={0} value={KmF} />
      </Form.Item>
      <Form.Item >
        <Input value={`${restaKm} Km`} disabled />
      </Form.Item>
      <Form.Item >
        <Input  value={` $${totalImporte}`} disabled />
      </Form.Item>
      <Form.Item>
        <Input.TextArea name="nota" placeholder="Nota" value={nota}/>
      </Form.Item>

      <Form.Item >
        <Button block style={{borderRadius:10}} htmlType="submit" >Agregar</Button>
      </Form.Item> 

      <div className='table-km-sm'>
        <TablaKm datos={filtroSinKmId} borrar={borrar} long={300} />

        </div>

      <Form.Item >
  
        <ModalKm title={'Finalizar'}  state={km} setState={setKm} click={handleConfirm} boton={'Confirmar'} style={style} block={true} Return={'Salir'} Submit={'Guardar'}>
          <ImagenKm state={km} setState={setKm}/>
          </ModalKm>
      </Form.Item>
    </Form>
      <div className='table-km-xl'>
      <TablaKm datos={filtroSinKmId} borrar={borrar} />
      </div>
        
   
    </div>
    
  );
};
