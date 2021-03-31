import React,{useState,useEffect} from 'react'
import { BotonSubmit } from '../botones/BotonSubmit'
import { InputMsg } from '../formularios/InputMsg'
import { Form, Col} from "react-bootstrap";
import emailjs from "emailjs-com";
import { Select } from "../../input/Select";
import axios from 'axios'
import './sueldo.css'
import { InputCalendario } from '../formularios/InputCalendario';
export const Vacaciones = () => {
  const [selectedDate, setSelectedDate] = useState({
    select1: new Date(),
    select2: new Date(),
    select3: new Date(),
  });
  
  const [diasVacaciones, setDiasVacacines] = useState([])
  const [users, setUsers] = useState([]);
  const [periodo,setPeriodo]=useState({
    datosPeriodo:[],
    titulo:''
  })
const [dia, setDia] = useState('dias')
const [ vaca,setVaca]=useState([])
  /***iniciamos el estado******/
  const [vacaciones, setVacaciones] = useState({
    periodo: "",
    fechaSolicitud: new Date().toLocaleDateString(),
    fechaHasta: "",
    fechaDesde:"",
    dias: "",
    diasFaltantes: "",
    obs: "",
    usuarioId: "1",
    empleado: "Empleado",
  });
  const { perido, empleado,dias,fechaDesde } = vacaciones;
  /******fx solicitud de usuarios a DB con axios *******/
  const getUser = async () => {
    let result = await axios.get("http://localhost:4000/api/users/allusers");
    setUsers(result.data);
   // console.log(result.data[0].departamento);
  };
  const getVacaciones = async () => {
    let result = await axios.get("http://localhost:4000/api/users/vacaciones");
    setVaca(result.data);
    console.log(result.data);
  };
   const getDiasVacaciones = async () => {
    let peticion= await axios.get("http://localhost:4000/api/users/lista/vacaciones");
    let result= peticion.data.map(p=>{return {id:p.id,nombre:p.dias}})
    setDiasVacacines(result);
  };
  
  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    setVacaciones({
      ...vacaciones, 
      [e.target.name]: e.target.value,
    });
  };
  
  const handleClickChange = (e) => {
    let valor=e.target.attributes.name.value
    let todasLasVacaciones=users.map(o=>o.vaca)//array de las vacaciones
    let buscarUsuario = users.find(u=>u.id==e.target.value);
    let arrayVacaciones = buscarUsuario.vaca
    let arrayPeriodo= arrayVacaciones.map(u=> {return {id:u.id,nombre:u.periodo}})
    let arrayDias= arrayVacaciones.map(u=>{return{
      id:u.id,
      nombre:u.diasFaltantes
    } })
    //console.log(users)
 let buscarVacaciones=vaca.find(u=>u.id==e.target.value);
 console.log(buscarVacaciones?.diasFaltantes);

if(valor=='usuarioId'){

  setDia({datosDias:arrayDias})
  setPeriodo({datosPeriodo:arrayPeriodo})
  
  setVacaciones({
    ...vacaciones,
    empleado: e.target.innerHTML,
    usuarioId: e.target.value,
    dias: maximoDeDiasVacaciones().toString()
  })
 

}else if(valor==='periodo'){
  setPeriodo({...periodo,titulo:e.target.innerHTML})
  setVacaciones({...vacaciones,periodo:e.target.innerHTML})
  setDia(buscarVacaciones?.diasFaltantes)
}else if(valor=='dias'){
  console.log(vacaciones);
 let aaa = users.map(o=>o.vaca)
 let bbb= aaa.map(o=>o.vaca)
 //console.log(aaa);
} };
const diasDeVacacionesEmpleado=()=>{
  console.log(users);
  let buscarUsuario= users.find(v=>v.id==vacaciones.usuarioId)
  let f=new Date().toLocaleDateString().split('/')[2]-buscarUsuario?.fechaContratacion.split('/')[2]
  return(f);
}

const diasDeVacacionesPorAño = () => {
  let vacation =
  diasDeVacacionesEmpleado() <= 5
      ? 14
      : diasDeVacacionesEmpleado() > 5 && diasDeVacacionesEmpleado() <= 10
      ? 21
      : diasDeVacacionesEmpleado() > 10 && diasDeVacacionesEmpleado() <= 20
      ? 28
      : 35;
  return vacation;
};

console.log(diasDeVacacionesPorAño());

const maximoDeDiasVacaciones=()=>{

let buscarPorDiasVacaciones = diasVacaciones.find(d=>d.nombre==diasDeVacacionesPorAño())
console.log(buscarPorDiasVacaciones?.nombre);
return (buscarPorDiasVacaciones?.nombre)
};
const verificarSiUsuarioTieneVacacionesPendientes = () =>{
  let usuarioConVacacionPendientes= users.find(u=>u.id==vacaciones.usuarioId)
 return(usuarioConVacacionPendientes?.vaca);
}

  useEffect(() => {
    getUser();
    getVacaciones()
    getDiasVacaciones()
  }, []);

  const fechaInicio =  (fecha) => {
  
    let newFormat = fecha.toLocaleDateString();
    let diaNumero = parseInt(dias);//19
   // console.log(diaNumero);
    let desde= fecha.getDate();
    console.log(desde);
    //let ida = parseInt(desde);
    let vuelta = new Date();
   let a= vuelta.setDate(41);
   console.log(a);
    let finVacaciones = vuelta.toLocaleDateString();
    setSelectedDate({ ...selectedDate, select2: fecha });
    setVacaciones({ ...vacaciones, fechaDesde: newFormat, fechaHasta:finVacaciones});
    
  };

 /* const calcularDiasVacaciones =  (e) => {
    let diaNumero = parseInt(dias);
    console.log(diaNumero,'soy dianumero');
    let desde = fechaDesde.split("/")[0];
    let ida = parseInt(desde);
    console.log(ida,'soy la ida');
    let vuelta = new Date();
    vuelta.setDate(15);
    let finVacaciones = vuelta.toLocaleDateString();
    return finVacaciones;
  };
 console.log(calcularDiasVacaciones());*/
console.log(vacaciones);



    return (
      <>
     <form className='form' >
        <h3 className='titulo'>Solicitud de Vacaciones</h3>
        <Form.Row>
          <Form.Group as={Col} xs={12}>
            <Select
            array={users}
            widthSelect='645px'
            width='300px'
            titulo={ empleado||'Empleado'}
            name="usuarioId"
            click={handleClickChange}/>
          </Form.Group>
          
          {verificarSiUsuarioTieneVacacionesPendientes()?.length<=0?
          console.log('estoy vacio'):
          <>
          <Form.Group as={Col} xs={6}>
          <Select
            array={periodo.datosPeriodo}
            name="periodo"
            width='300px'
            click={handleClickChange}
            titulo={ periodo.titulo||'Periodo'}
        
          />
        </Form.Group>
          
          <Form.Group as={Col} xs={6}>
            <Form.Control
            placeholder={dia||'dias'}
              type='text'
               disabled
            />
          </Form.Group>
          
          </>
          }
          <Form.Group as={Col} xs={6}>
            <Form.Control
            placeholder={new Date().toLocaleDateString().split('/')[2]-1}
              type='text'
               disabled
            />
          </Form.Group>
          
          <Form.Group as={Col} xs={6}>
            <Form.Control
            placeholder={dias}
              type='number'
              name='dias'
              onChange={handleChange}
             
            />
          </Form.Group>
          <InputCalendario selected={selectedDate.select2} change={fechaInicio} />
          
       
          </Form.Row>
          
        





        {/*<Form.Group>
          <Select titulo='Empleado' />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Control type="text" placeholder="Importe" />
          </Form.Group>

          <Form.Group as={Col} >
            <Select titulo='Cuotas' />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} >
            <Select titulo='Sueldo' />

          </Form.Group>

          <Form.Group as={Col} >
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Form.Row>
        <InputMsg width='500px' />
        <BotonSubmit />*/}

      </form>
      </>
    )
}
