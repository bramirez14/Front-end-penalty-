import React, { useState, useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import { Select } from "../inputs/Select";
import Swal from "sweetalert2";
import "./sueldo.css";
import { InputCalendario } from "../formularios/InputCalendario";
import axiosURL from "../../config/axiosURL";

export const Vacaciones = ({history}) => {
  const [validated, setValidated] = useState(false);
  const [users, setUsers] = useState([]);
  const [periodo, setPeriodo] = useState({
    datosPeriodo: [],
    titulo: "",
  });
  const [selectedDate, setSelectedDate] = useState({
    select2: new Date(),
  });
  const { datosPeriodo} = periodo;
  const [dia, setDia] = useState("dias");
  const [vaca, setVaca] = useState([]);
  /***iniciamos el estado******/
  const [vacaciones, setVacaciones] = useState({
    periodo: (new Date().getFullYear() - 1).toString(),
    fechaSolicitud: new Date().toLocaleDateString(),
    fechaHasta:"",
    fechaDesde: new Date().toLocaleDateString(),
    dias: "",
    diasFaltantes: "0",
    obs: "",
    usuarioId: "",
  });
  const { empleado, dias, fechaDesde } = vacaciones;
  /*****Alertas******/
  const handleAlert = () => {
    Swal.fire({
      title: "Solicitud enviada",
      text: "Se aprobara en un plazo de 24hs, gracias por la espera.",
      imageUrl:
        "data:image/jpeg;base64,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",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "penalty",
    });
  };

  /******fx solicitud de usuarios a DB con axios *******/
  const getUser = async () => {
    let result = await axiosURL.get("/allusers");
    setUsers(result.data);
    // console.log(result.data[0].departamento);
  };
  const getVacaciones = async () => {
    let result = await axiosURL.get("/vacaciones");
    setVaca(result.data);
    //    console.log(result.data);
  };


  const handleChange = (e) => {
    var valor = e.target.name;
    console.log(valor);
    let todasLasVacaciones = users.map((o) => o.vaca); //array de las vacaciones
    let buscarUsuario = users.find((u) => u.id == e.target.value);
    let arrayVacaciones = buscarUsuario?.vaca;
    let arrayPeriodo = arrayVacaciones?.map((u) => {
      return { id: u.id, nombre: u.periodo };
    });
    let arrayDias = arrayVacaciones?.map((u) => {
      return {
        id: u.id,
        nombre: u.diasFaltantes,
      };
    });
    let buscarVacaciones = vaca.find((u) => u.id == e.target.value); //este vaca es del estado vaca no de users
    console.log(buscarVacaciones);
    if (valor == "usuarioId") {
      setDia("dias");
      setPeriodo({ datosPeriodo: arrayPeriodo });
      setVacaciones({
        ...vacaciones,
        usuarioId: e.target.value,
        dias: diasDeVacacionesPorAño().toString(),
        fechaHasta:dd(diasDeVacacionesPorAño()),
      });
    } else if (valor === "periodo") {
      let periodoId = e.target.value;
      let buscarPeriodo = datosPeriodo.find((l) => l.id == periodoId);

      setVacaciones({
        ...vacaciones,
        periodo: buscarPeriodo?.nombre.toString(),
      });
      setDia(buscarVacaciones?.diasFaltantes);
    } else if (valor === "fechaDesde") {
    } else {
      setVacaciones({
        ...vacaciones,
        [e.target.name]: e.target.value,
      });
    }
  };

  const diasDeVacacionesEmpleado = () => {
    let buscarUsuario = users.find((v) => v.id == vacaciones.usuarioId);
    console.log(buscarUsuario);
    let f =
      new Date().toLocaleDateString().split("/")[2] -
      buscarUsuario?.fechaContratacion.split("/")[2];
    return f;
  };
  console.log(diasDeVacacionesEmpleado());

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

  const verificarSiUsuarioTieneVacacionesPendientes = () => {
    let usuarioConVacacionPendientes = users.find(
      (u) => u.id == vacaciones.usuarioId
    );
    return usuarioConVacacionPendientes?.vaca;
  };
const  dd=(f)=>{
  let fActual= new Date()
  fActual.setDate(f)
  let d= fActual.toLocaleDateString()
  return d
}

  const restaVaciones = () => {
    let diasTotales = diasDeVacacionesPorAño();
    let diasVacaciones = vacaciones.dias;
    const diasFaltantesFinales = diasTotales - diasVacaciones;

    if (diasFaltantesFinales < 0) {
      alert("No podes tomarte mas dias de lo que te corresponde");
    } else {
      let int = parseInt(diasFaltantesFinales);
      console.log(int);
      let estado = vacaciones.fff;

      estado.setDate(int);
      let editandoElEstado = estado.toLocaleDateString();
      console.log(editandoElEstado);
      alert(
        `Los dias de vacaciones restantes son ${diasFaltantesFinales} dias `
      );

      setVacaciones({
        ...vacaciones,
        diasFaltantes: diasFaltantesFinales,
      });
    }
  };

  useEffect(() => {
    getUser();
    getVacaciones();
    
  }, []);

  const retorno = (f) => {
    setSelectedDate({ ...selectedDate, select2: f });
  };
  const fechaInicio = (fecha) => {
    let diasTotales = diasDeVacacionesPorAño();
    let diasVacaciones = vacaciones.dias;
    let diasFaltantesFinales = diasTotales - diasVacaciones;
    console.log(diasFaltantesFinales);
    let newFormat = fecha.toLocaleDateString();
    let mesFecha = fecha.getMonth();
    let mes = new Date().getMonth();
    let diaNumero = parseInt(dias);
    console.log(diaNumero);
    let desde = fecha.getDate() - 1;
    console.log(desde);
    let fechaActual = new Date();
    retorno(fecha);
    if (mes === mesFecha) {
      let a = fechaActual.setDate(diaNumero + desde);
      console.log(a);
      let finVacaciones = fechaActual.toLocaleDateString();
      console.log(finVacaciones);
      setVacaciones({
        ...vacaciones,
        fechaDesde: newFormat,
        fechaHasta: finVacaciones,
        diasFaltantes: diasFaltantesFinales.toString(),
      });
    } else {
      setVacaciones({
        ...vacaciones,
        fechaDesde: newFormat,
        diasFaltantes: diasFaltantesFinales.toString(),
      });
      console.log("pendiente estamos trabajando");
    }
  };
  const guardarAnticipoDeVacaciones = async () => {
    let result = await axiosURL.post(
      "/vacaciones",
      vacaciones
    );
    console.log(result);
   /*  if (result.status === 200) {
      history.push("/");
    } */
  };
  /********enviamos el formulario a DB********/
/****efecto q se produce una vez despes del rederizado*****/
 

  const departamento=()=>{
    let usuarioDep=users.find(u=> u.id==vacaciones.usuarioId)
    return(usuarioDep?.departamento.departamento)
  }
console.log(departamento());






  const validacion = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() == false) {
      e.stopPropagation();
    } else {
      handleAlert();
      guardarAnticipoDeVacaciones();
      
    }
    setValidated(true);
  };

  let handleSubmit;


   /*******condicion para envio de mail a cada departamento******* */
    if(departamento()==='Sistemas'|| departamento()==='Logistica'){
      handleSubmit = (e) => {
       e.preventDefault();
       handleAlert();
       guardarAnticipoDeVacaciones();
       
        //enviarMensaje()
     
      
        
       }
   }else{
      handleSubmit = (e) => {
       e.preventDefault();
       handleAlert();
       guardarAnticipoDeVacaciones();
           //enviarMensaje()
     }
   }
  /************falta hacer la verificacion de  si el usuario ya tiene 
    un periodo del mismo año ************** */
  console.log(vacaciones);
  return (
    <>
      <Form className="form" noValidate validated={validated} onSubmit={handleSubmit}>
        <h3 className="titulo">Solicitud de Vacaciones</h3>
        <Form.Row>
          <Form.Group as={Col} md="12">
            <Select
              titulo="Empleado"
              name="usuarioId"
              array={users}
              change={handleChange}
            />
            {/*Selec boostrap personal */}
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          {verificarSiUsuarioTieneVacacionesPendientes()?.length <= 0 ? (
            <>
              <Form.Group as={Col} xs={3}>
                <Form.Label style={{ marginLeft: "10px" }}>Periodo</Form.Label>
                <Form.Control
                  placeholder={
                    new Date().toLocaleDateString().split("/")[2] - 1
                  }
                  type="text"
                  disabled
                />
              </Form.Group>

              <Form.Group as={Col} xs={3}>
                <Form.Label style={{ marginLeft: "10px" }}>Dias</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder={dias || "dias"}
                  name="dias"
                  onChange={handleChange}
                />
               
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label style={{ marginLeft: "30px" }}>
                  Inicio de Vacaciones
                </Form.Label>
                <InputCalendario
                  selected={selectedDate.select2}
                  change={fechaInicio}
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group as={Col} xs={3}>
                <Form.Label style={{ marginLeft: "10px" }}>Periodo</Form.Label>
                <Select
                  array={periodo.datosPeriodo}
                  name="periodo"
                  change={handleChange}
                  titulo={"Periodo"}
                />
              </Form.Group>

              <Form.Group as={Col} xs={3}>
                <Form.Label style={{ marginLeft: "10px" }}>Dias</Form.Label>
                <Form.Control
                  placeholder={dia || "dias"}
                  type="number"
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label style={{ marginLeft: "20px" }}>
                  Inicio de Vacaciones
                </Form.Label>
                <InputCalendario
                  selected={selectedDate.select2}
                  name={"fechaDesde"}
                  change={fechaInicio}
                />
              </Form.Group>
            </>
          )}
        </Form.Row>
        {/*Separacio............................................. */}
        <Form.Row></Form.Row>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            placeholder="Mensaje"
            rows={4}
            name="obs"
            onChange={handleChange}
          />
        </Form.Group>
        <Button style={{ width: "620px" }} type="submit" variant="success">
          Enviar
        </Button>
      </Form>
    </>
  );
};
