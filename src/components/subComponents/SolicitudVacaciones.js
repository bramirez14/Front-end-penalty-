import React, { useState, useEffect } from "react";
import { Container, Form, InputGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaHandHoldingUsd, FaSortNumericUp } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { SiGooglecalendar } from "react-icons/si";
import Swal from "sweetalert2";
import axios from "axios";
import { Titulo } from "../titulos/Titulo";

export const SolicitudVacaciones = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    select1: new Date(),
    select2: "",
    select3: "",
  });
  const [vacaciones, setVacaciones] = useState({
    periodo: "",
    fechaSolicitud: new Date().toLocaleDateString(),
    fechaHasta: "",
    fechaDesde: "",
    dias:"",
    obs: "",
    idusuario: "1",
  });
  const { periodo,dias } = vacaciones;

/*Aleert */

const handleAlert = (e) => {
  Swal.fire({
    title: "Solicitud de Vacacion enviada",
    text: "Se aprobara en un plazo de 24hs, gracias por la espera.",
    imageUrl:
      "data:image/jpeg;base64,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",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "penalty",
  });
};
/**fin alert**/

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
  /**funcion para saber los dias de vacaciones **/
  const foundUser = ()=>{ let oneUserName = users?.find((user) => user.id == vacaciones.idusuario);
  return oneUserName.nombre}
  const vacationYears = () => {
    let oneUser = users?.find((user) => user.id == vacaciones.idusuario);
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let date =
      new Date().toLocaleDateString(options).split("/")[2] -
      1 -
      oneUser?.fechaContratacion.split("/")?.[2];


    return date;
  };
  const vacationDays = () => {
let vacation=
    vacationYears() <= 5
        ? 14
        : vacationYears() > 5 && vacationYears() <= 10
        ? 21
        : vacationYears() > 10 && vacationYears() <= 20
        ?  28
        :  35;
return vacation

  };

/***funcion para enviar la solicitud al back ***/

const saveVacaciones = async () => {
  let result = await axios.post(
    "http://localhost:4000/api/users/vacaciones",
    vacaciones
  );
  console.log(result);

  if (result.status === 200) {
    history.push("/profile");
  }
};
const handleSubmit = (e) => {
  e.preventDefault();
  saveVacaciones();
};
  console.log(vacaciones);
  return (
    <>
        <Titulo titulo='Vacaciones'/>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre del empleado</Form.Label>
            <Form.Control
              as="select"
              name="idusuario"
              onChange={(getUser, handleChange)}
            >
              {users.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/**Periodo**/}
          <Form.Group>
          <Form.Label>Periodo</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>O</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="inlineFormInputGroupUsername"
                name="periodo"
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          {periodo.length == 4 ? (
            <>
           <p>Se sugiere que el empleado {foundUser()} le corresponde {vacationDays()} dias usted puede determinar mas o menos a continuacion:</p> 
           <Form.Group>
           <InputGroup>
             <InputGroup.Prepend>
               <InputGroup.Text>O</InputGroup.Text>
             </InputGroup.Prepend>
             <FormControl
               type='number'
               name="dias"
               onChange={handleChange}
             />
           </InputGroup>
         </Form.Group>
         </>
          ) :""}
      


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
          <Form.Group>
            <Form.Label>Observacion</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              id="text"
              name="obs"
              defaultValue="Mensaje:"
              onChange={handleChange}
            />
          </Form.Group>
          <button className="btn btn-success " onClick={handleAlert}> Enviar </button>
        </Form>

        <button onClick={handleBack}>Atras</button>
      </Container>
    </>
  );
};
