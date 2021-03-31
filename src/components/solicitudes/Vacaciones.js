import React,{useState,useEffect} from 'react'
import { BotonSubmit } from '../botones/BotonSubmit'
import { InputMsg } from '../formularios/InputMsg'
import { Form, Col} from "react-bootstrap";
import emailjs from "emailjs-com";
import { Select } from "../../input/Select";
import axios from 'axios'
import './sueldo.css'
export const Vacaciones = () => {
  const [users, setUsers] = useState([]);
  const [periodo,setPeriodo]=useState({
    datosPeriodo:[],
    titulo:''
  })
const [dias, setDias] = useState('dias')
const [ vaca,setVaca]=useState([])
  /***iniciamos el estado******/
  const [vacaciones, setVacaciones] = useState({
    periodo: "",
    fechaSolicitud: new Date().toLocaleDateString(),
    fechaHasta: "",
    fechaDesde: new Date().toLocaleDateString(),
    dias: "",
    diasFaltantes: "",
    obs: "",
    usuarioId: "1",
    empleado: "Empleado",
  });
  const { perido, empleado } = vacaciones;
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
  
  const handleChange = (e) => {
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
  
  setDias({datosDias:arrayDias})
  setPeriodo({datosPeriodo:arrayPeriodo})
  setVacaciones({
    ...vacaciones,
    empleado: e.target.innerHTML,
    usuarioId: e.target.value,
  })

}else if(valor==='periodo'){
  setPeriodo({...periodo,titulo:e.target.innerHTML})
  setVacaciones({...vacaciones,periodo:e.target.innerHTML})
  setDias(buscarVacaciones?.diasFaltantes)
}else if(valor=='dias'){
 
  console.log(vacaciones);
 let aaa = users.map(o=>o.vaca)
 let bbb= aaa.map(o=>o.vaca)
 //console.log(aaa);

 //console.log(bbb);

}
;/*
    valor=='cuotas'&&setAnticipo({
      ...anticipo,
      cuotas: e.target.innerHTML,
      //cuotas: e.target.value,
    })
   */
  
  }

  //console.log(vacaciones.perido);
  useEffect(() => {
    getUser();
    getVacaciones()
  }, []);
const verificarSiUsuarioTieneVacacionesPendientes = () =>{
  let usuarioConVacacionPendientes= users.find(u=>u.id==vacaciones.usuarioId)
 return(usuarioConVacacionPendientes?.vaca);
}

//console.log(users[2].vaca[0])//año del periodo
console.log(verificarSiUsuarioTieneVacacionesPendientes())
//console.log(dias)


    return (
      <>
     <form className='form' >
        <h3 className='titulo'>Solicitud de Vacaciones</h3>
        <Form.Row>
          <Form.Group as={Col} xs={12}>
            <Select
            array={users}
            widthSelect='615px'
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
            placeholder={dias||'dias'}
              type='text'
               disabled
            />
          </Form.Group>
          
          </>
          
          
          }
          
         
        
        
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
