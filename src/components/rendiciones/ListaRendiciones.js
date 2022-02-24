import React, { useContext } from "react";
import { Encabezado } from "./Encabezado";
import { Button, Col, Row } from "antd";
import { CardRendiciones } from "./CardRendiciones";
import { Link,useNavigate,useParams } from "react-router-dom";
import {axiosURL} from "../../config/axiosURL";
import { SubEncabezado } from "./SubEncabezado";
import { UserContext } from "../../context/UserContext";
import { saveAs } from "file-saver";
import { useGet } from "../../hooks/useGet";
import { PeticionGET } from "../../config/PeticionGET";
import { SocketContext } from "../../context/SocketContext";

export const ListaRendiciones = () => {
  const navigate = useNavigate();
  const {socket} = useContext(SocketContext)
  const { id } = useParams();
  const [peticionGastoId,axiosGet] = useGet(`/gastos/${id}`);
  const uid = localStorage.getItem('uid')
  const datosUsuario = PeticionGET(`/${uid}`)
  const usuarios= PeticionGET(`/allusers`)
  const filtroUsuario905= usuarios.filter(u=>u.nvendedor === '905')

  const filtrodata905 = filtroUsuario905.map(f=> 
  {return{
  alerta: 'solicitud aprobada',
 info:'Tenes una operacion de  Gasto ',
 nombre:`${f.nombre} ${f.apellido}`,
 usuarioId:uid,
 f: new Date().toLocaleString(),
 path:'/vista/rendicion/gasto',
 estado:'activa',
 receptor:f.email,
  emisor:datosUsuario.email,
 }});

  // prohibe ingreso por medio de la ruta
  peticionGastoId?.listo==='Si'&& navigate('/perfil')

  const todasLasRendicones = peticionGastoId?.rendicion;
  const sumaGastos = todasLasRendicones?.map((sg) => sg.importe);
  let totalDeImporte;
  if (sumaGastos?.length > 0) {
    totalDeImporte = sumaGastos?.reduce((acumulador, item) => {
      return (acumulador = parseFloat(acumulador) + parseFloat(item));
    });
  }
  const importe = peticionGastoId?.importe;
  const Text = useContext(UserContext);

  const handleClick = async () => {
    let res = await axiosURL.post("/generar/pdf", todasLasRendicones);
    if (res.status === 200) {
      let ge = await axiosURL.get("peticion/pdf", { responseType: "blob" });
      const pdfBlob = await new Blob([ge.data], { type: "application/pdf" });
      saveAs(pdfBlob, "penaltyIntranet.pdf");
    }
  };
  
  const onClick = () => {
    if(peticionGastoId?.sinAnticipo!=='sin'){
    
      navigate(`/crear/rendicion/${id}`);
  }else{
    navigate(`/crear/rendicion/${id}`);
  }
  };

  const listo = async ()=>{
    const obj={
       alerta: 'Rendiciones finalizadas',
    info:'Tenes una operacion de  Gasto ',
    nombre:`${datosUsuario.nombre} ${datosUsuario.apellido}`,
    usuarioId:uid,
    f: new Date().toLocaleString(),
    path:'/aprobacion/gastos',
    estado:'activa',
    receptor:datosUsuario.gerente.email,
     emisor:datosUsuario.email,
    }
   
    if(peticionGastoId?.sinAnticipo!=='sin'){
      for (const i of filtrodata905) {
      socket.emit('alerta-nueva',i)
      }
      
    }else{
      socket.emit('alerta-nueva',obj)

    }
      let res=await axiosURL.put(`/gasto/finalizado/${id}`,{listo:'Si'});
      res.status===200&& navigate('/gastos')
  };
  return (
    <div className='container-form'>

      <Encabezado />
      <SubEncabezado
        uuid={id}
        total={totalDeImporte}
        importeAnticipo={importe}
        sinAnticipo={peticionGastoId.sinAnticipo}
      />
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Button style={{ marginTop: "10px" }} onClick={onClick}>
            Agregar Gasto
          </Button>
          <Link to="/gastos">
            <Button className="btn-list-rendicion">X</Button>
          </Link>
            <CardRendiciones
             
              data={todasLasRendicones}
              uid={id}
              importeAnt={totalDeImporte}
              axiosGet={axiosGet}
            />
        </Col>
        </Row>
        <Row>
        <Col >
          
          <Button  style={{ marginTop: "10px" }} onClick={handleClick}>
          Generar PDF
          </Button>
        
      
          <Button  style={{ marginTop: "10px",marginLeft:'10px'}} onClick={listo}>
          Finalizar
          </Button>
        
        
        </Col>
        </Row>
    </div>
  );
};
