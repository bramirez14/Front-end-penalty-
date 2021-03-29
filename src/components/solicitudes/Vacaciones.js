import React,{useState,useEffect} from 'react'
import { BotonSubmit } from '../botones/BotonSubmit'
import { InputMsg } from '../formularios/InputMsg'
import { Form, Col } from "react-bootstrap";
import emailjs from "emailjs-com";
import { Select } from "../../input/Select";
import axios from 'axios'
import './sueldo.css'
export const Vacaciones = () => {
  const [users, setUsers] = useState([]);
  /***iniciamos el estado******/
  const [vacaciones, setVacaciones] = useState({
    periodo: "",
    fechaSolicitud: new Date().toLocaleDateString(),
    fechaHasta: "",
    fechaDesde: new Date().toLocaleDateString(),
    dias: "",
    diasFaltantes: "",
    obs: "",
    idusuario: "1",
    empleado: "Empleado",
  });
  const { perido, empleado } = vacaciones;
  /******fx solicitud de usuarios a DB con axios *******/
  const getUser = async () => {
   
    let result = await axios.get("http://localhost:4000/api/users/allusers");
    setUsers(result.data);
   // console.log(result.data[0].departamento);
  };
  const handleChange = (e) => {
    setVacaciones({
      ...vacaciones, 
      [e.target.name]: e.target.value,
    });
  };
  const handleClickChange = (e ) => {
    let valor=e.target.attributes.name.value
    console.log(valor);
    valor=='usuarioId'&&
setVacaciones({
  ...vacaciones,
  empleado: e.target.innerHTML,
  usuarioId: e.target.value,
});/*
    valor=='cuotas'&&setAnticipo({
      ...anticipo,
      cuotas: e.target.innerHTML,
      //cuotas: e.target.value,
    })
   */
  }
  useEffect(() => {
    getUser();
 
  }, []);


console.log(users)
console.log(vacaciones)

    return (
      <>
     <form className='form' >
        <h3 className='titulo'>Solicitud de Vacaciones</h3>
        <Form.Row>
          <Form.Group as={Col} xs={6}>
            <Select
            array={users}
            width='300px'
            titulo={ empleado||'Empleado'}
            name="usuarioId"
            click={handleClickChange}/>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              type="number"
              name="periodo"
              placeholder="Periodo"
              onChange={handleChange}
            />
          </Form.Group>
        
        
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
