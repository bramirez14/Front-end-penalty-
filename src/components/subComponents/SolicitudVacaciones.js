import React, { useState, useEffect } from "react";
import { Container, Form, InputGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaHandHoldingUsd, FaSortNumericUp } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { SiGooglecalendar } from "react-icons/si";
import axios from "axios";

export const SolicitudVacaciones = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    select1: new Date(),
    select2: "",
    select3: "",
  });
  const [vacaciones, setVacaciones] = useState({
   periodo: "",
  fechaSolicitud: "",
    fechaHasta: "",
    fechaDesde: "",
    dias: "",
    obs: "",
    idusuario: '1',
  });
  const { periodo }=vacaciones

  const getUser = async () => {
    let result = await axios.get("http://localhost:4000/api/users/allusers");
    setUsers(result.data);
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
   // console.log(e.target.value);
    setVacaciones({
      ...vacaciones, //copia del anticipo actual
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    history.push("/profile");
  };
  const fechaSolicitud = (fecha) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let newFormat = fecha.toLocaleDateString(options);
    setSelectedDate({ ...selectedDate, select1: fecha });
    setVacaciones({ ...vacaciones, fechaSolicitud: newFormat });
  };

  const fechaDesde = (fecha) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let newFormat = fecha.toLocaleDateString(options);
    setSelectedDate({ ...selectedDate, select2: fecha });
    setVacaciones({ ...vacaciones, fechaDesde: newFormat });
  };
  const fechaHasta = (fecha) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let newFormat = fecha.toLocaleDateString(options);
    setSelectedDate({ ...selectedDate, select3: fecha });
    setVacaciones({ ...vacaciones, fechaHasta: newFormat });
  };
/**funcion para saber los dias de vacaciones */
 const vacationYears =()=>{
  let oneUser=users?.find(user=> user.id == vacaciones.idusuario )
  
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = (new Date().toLocaleDateString(options).split("/")[2]-1) - ( oneUser?.fechaContratacion.split("/")?.[2])
 console.log(date);
  
  return date;
 }
 const vacationDays =()=>{
  
  let vacation= vacationYears()<=5? 14:vacationYears()>5 && vacationYears()<=10? 21:vacationYears()>10 && vacationYears()<=20? 28: 35 ;
  console.log(vacation);
return vacation
 }
 console.log(vacaciones);
  return (
    <>
      <Container>
        <Form>
       <Form.Group>
            <Form.Label>Nombre del empleado</Form.Label>
            <Form.Control
              as="select"
              name="idusuario"
              onChange={(getUser, handleChange)}
            >
              {users.map((list) => (
                <option key={list.id} value={list.id} >
                  {list.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
         { /**Periodo**/}
          <Form.Group>
          <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>O</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="inlineFormInputGroupUsername" name='periodo' onChange={handleChange}/>
      </InputGroup>
      </Form.Group>
      {periodo.length === 4 ? 
 <Form.Group >
 <Form.Label>Los dias de vacaciones que le corresponde son: </Form.Label>
 <Form.Control type="number" name="dias" defaultValue={vacationDays()} onChange={handleChange} />
 
</Form.Group>:""}

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <SiGooglecalendar className="icono" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <DatePicker
                className="input"
                name="fechaSolicitud"
                selected={selectedDate.select1}
                onChange={fechaSolicitud}
                dateFormat="dd/MM/yyyy"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <SiGooglecalendar className="icono" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <DatePicker
                className="input"
                name="fechaDesde"
                selected={selectedDate.select2}
                onChange={fechaDesde}
                dateFormat="dd/MM/yyyy"
              />
            </InputGroup>
          </Form.Group>{" "}

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <SiGooglecalendar className="icono" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <DatePicker
                className="input"
                name="fechaHasta"
                selected={selectedDate.select3}
                onChange={fechaHasta}
                dateFormat="dd/MM/yyyy"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group >
    <Form.Label>Observacion</Form.Label>
    <Form.Control as="textarea" rows={8}  id="text"
            name="obs"
            defaultValue="Mensaje:"
            onChange={handleChange}
            />
  </Form.Group>
          
          <button className="btn btn-success "> Enviar </button>
        </Form>

        <button onClick={handleBack}>Atras</button>
      </Container>
    </>
  );
};
