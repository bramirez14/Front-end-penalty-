import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Select, Col, Row, Divider } from "antd";
import { UserContext } from "../../contexto/UserContext";
import { SelectAnt } from "../inputs/SelectAnt";
import { Titulo } from "../titulos/Titulo";
import axiosURL from "../../config/axiosURL";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import "./css/anticipoGasto.css";


export const Sueldo = ({ history }) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let name = JSON.parse(localStorage.getItem("name"));
  let id = JSON.parse(localStorage.getItem("id"));

  const [validated, setValidated] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([{ id: "", nombre: "" }]);
  const [anticipo, setAnticipo] = useState({
    sueldo: "Sueldo",
    cuotas: "1",
    importe: "",
    fecha: new Date().toLocaleDateString(),
    mensaje: "",
    usuId: id,
  });
  const { Option } = Select;
  const { sueldo, importe, mensaje, fecha, cuotas,usuId} = anticipo;
 
  /******useContex*******/
  const Text=useContext(UserContext)
  const {open}=Text
  
  /******fx de alerta para el usuario visual*******/
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

  const handleRechazo = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        "NO PODES ENVIAR EL ANTICIPO PONGASE EN CONTACTO EL DEPARTAMENTO DE GERENCIA, GRACIAS",
    });
  };
  /******fx para deteminar catidad  de cuotas *******/
  const verificarMes = () => {
    let vacio = [];
    let day = new Date().toLocaleDateString().split("/");
    let dataEnd = "31/12".split("/");
    let resta = dataEnd[1] - day[1];
    for (let i = 1; i <= resta; i++) {
      vacio.push({ id: i, nombre: i });
    }
    setData(vacio);
  };
  /***********tiempo restante para la devolucion************** */
  const subtration = (fechaSolicitud) => {
    let b = "31/12";
    let date_a = fechaSolicitud.split("/"); // ['dd','mm','yyyy']
    let date_b = b.split("/"); // ['dd','mm','yyyy']
    let year = date_a[2];
    let restaMes = date_b[1] - date_a[1];
    let restaDia = date_b[0] - date_a[0];
    return `
    El pago se debera realizar dentro del año ${year}.
    Tenes ${restaDia} dias  y  ${restaMes} meses para la devolucion del anticipo.
    Desde ya muchas gracias por su comprension`;
  };
  /*********** fin tiempo restante para la devolucion************** */

  /***********calculamos el mes************ */
  const mes = () => {
    let day = new Date().toLocaleDateString().split("/")[1];
    return day;
  };
  /*********** fin calculamos el mes***** */

  /****** f(x) solicitud de usuarios a DB con axios *******/
  const getUser = async () => {
    let result = await axiosURL.get("/allusers");
    setUsers(result.data);
    console.log(result.data);
    // console.log(result.data[0].departamento);
  };
  /*********fx para guardar anticipo con axios en DB **********/
  const guardarAnticipo = async (values) => {
    let result = await axiosURL.post("/anticipo", values);
    console.log(result);
    if (result.status === 200) {
      history.push("/");
    }
  };
  /****efecto q se produce una vez despes del rederizado*****/
  useEffect(() => {
    getUser();
    verificarMes();
  }, []);

  const departamento = () => {
    let usuarioDep = users.find((u) => u.id == anticipo.usuId);
    return usuarioDep?.departamento.departamento;
  };
  const aprobacion = () => {
    let a = users.find((u) => u.id == anticipo.usuId);
    return (a?.anticipoId)
  };
  console.log(aprobacion());
  /************submit para enviar el formulario ************************ */
  let handleSubmit;

  
    /*******condicion para envio de mail a cada departamento******* */
    if (departamento() === "Sistemas" || departamento() === "Logistica") {
      handleSubmit = (v) => {
        let u={...v,usuId,fecha}
        handleAlert();
        guardarAnticipo(u);
        //enviarMensaje()
      };
    } else {
      handleSubmit = (v) => {
        let u={...v,usuId,fecha}
        handleAlert();
        guardarAnticipo(u);
      };
    }
  
  /**********fin submit para enviar el formulario ************************/

  /**********funcion para enviar un mail de alerta **********************/
  const enviarMensaje = () => {
    //SgJZ2KTta9X#SMG
    let usuarioEncontrado = users.find((user) => user.id == anticipo.usuId);
    console.log(usuarioEncontrado);
    let datos = {
      empleado: usuarioEncontrado?.nombre,
      fecha: fecha,
      //fechaDevolucion:subtration(fecha), falta ria  la sustraccion de  aguinaldo
      mensaje: mensaje,
      importe: importe,
      sueldo: sueldo,
      cuotas: cuotas,
    };
    emailjs
      .send(
        "service_jow24ha",
        "template_qgz07f5",
        datos,
        "user_LA9p7MEAHHJWsAMu6m90s"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };
  const handleChange = (e) => {
    setAnticipo({
      ...anticipo,
      [e.target.name]: e.target.value,
    });
  };
  console.log(anticipo);
  /********************* fin funcion para enviar un mail de alerta ********************* */
  return (
    
    <div className={!open?'contenedor':'contenedor-active'}>
      <Form className="form" onFinish={handleSubmit}>
        <Titulo titulo="Anticipo de Sueldo" />
        <Row gutter={10}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
       
          <h3>{name}</h3>
          
         
          </Col>

          {aprobacion()!=1 ? (
            <h4>Ya tenes un anticipo pendiente!!!</h4>
          ) : (
          <>  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item   
              name='importe'
    rules={[
      {
        required: true,
        message: 'ingrese un importe',
      },
    ]}>
                <Input
                  type="number"
                  placeholder="Importe"
                  name="importe"
                  onChange={handleChange}
                  
                />
              </Form.Item>
            </Col>
{importe < 3000 ? (
  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
    <Form.Item 
  name='sueldo'
    rules={[
      {
        required: true,
        message: 'seleccione una opcion',
      },
    ]}
    >
      <Select placeholder="Devolucion">
        <Option value="Sueldo">Sueldo</Option>
        <Option value="Aguinaldo">Aguinaldo</Option>
      </Select>
    </Form.Item>
  </Col>
) : (
  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
    <Form.Item name='sueldo'>
      <Input disabled placeholder="Sueldo" />
    </Form.Item>
  </Col>
)}
{sueldo === "Sueldo" ? (
  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
   
      <SelectAnt
        placeholder="Cuotas"
        name="cuotas"
        array={data}
        mensaje='seleccione una opcion'
      />
  
  </Col>
) : mes() > 0 && mes() <= 5 ? (
  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
    <Form.Item name='cuotas'>
      <Input name="cuotas" placeholder="1" disabled />
    </Form.Item>
  </Col>
) : (
  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
    <Form.Item name='cuotas'>
      <Select name="cuotas" >
        <option value="1">1</option>
        <option value="2">2</option>
      </Select>
    </Form.Item>
  </Col>
)}

<Col xs={24} sm={24} md={24} lg={24} xl={24}>
  <Form.Item name='mensaje'>
    <Input.TextArea
      name="mensaje"
      placeholder="Mensaje"
      
    />
  </Form.Item>
</Col>
<Col xs={24} sm={24} md={24} lg={24} xl={24}>
  <Form.Item>
    <Button className='btn' htmlType="submit" block>
      Submit
    </Button>
  </Form.Item>
</Col>

</>
          )}

          

          
        </Row>
      </Form>
      </div>
   
  );
};
