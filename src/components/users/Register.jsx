import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Row,
  Col,
  Divider,
  Checkbox,
  Radio
} from "antd";
import { PeticionGET } from "../../config/PeticionGET";
import { axiosURL } from "../../config/axiosURL";
import { Titulo } from "../titulos/Titulo";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

export const Register = () => {
  const [fecha, setFecha] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [value, setValue] = useState();// value de radio
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAllAdmin, setCheckAllAdmin] = useState(false);
  const [checkAllSuper, setCheckAllSuper] = useState(false);
 const [disabledSuper, setDisabledSuper] = useState(false)
 const [disabledAdmin, setDisabledAdmin] = useState(false)
const [role, setRole] = useState('');
  const [plain, setPlain] = useState([])
  const navigate = useNavigate();

  const allPermissions = async () => {
    const { data } = await axiosURL.get("/permissions/all");
    setPermissions(data);
    let plainOptions = data.map((p) => ( {
    label: p.permission,
    value: p.id,
    disabled: false,
  }));
  setPlain(plainOptions);
  };
 
  
  useEffect(() => {
    allPermissions();
  }, []);
  const onFinish = async (values) => {
    let cel = "11".concat(values.cel);
    let valor = { ...values, fechaContratacion: fecha, cel,checkedList,role:!!role?role:null};
     let res = await axiosURL.post('/register',valor);
    if(res.data.status===400){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${res.data.errors[0].msg} para el campo ${res.data.errors[0].param}`,
      })
    }
    if(res.data.status===200){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se registro con exito',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/lista/usuarios')
    }
  };

  const onChange = (date, dateString) => {
    setFecha(dateString);
  };

  const dtos = PeticionGET("/departamentos");
  
  /* Check */
  const onChangeCheck = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plain.length);
    setCheckAllAdmin(list.length === plain.length);
    if(list.includes(1)){return setDisabledSuper(true)}else{ return setDisabledSuper(false)}//1 es usuarios
  };
  //ONCHANGE AD
  const onCheckAllChangeAdmin = (e) => {
  setRole(e.target.value);
  setValue(e.target.value);
  setCheckedList(e.target.checked ? plain.map(p=>p.value)  : []);
  const notUser= plain.map(pl => ({...pl,disabled:false}))
       
  setPlain(notUser);
      // setDisabledSuper(!disabledSuper)
    // setCheckedList(e.target.checked ? plain.map(p=>p.value)  : []);
    // setIndeterminate(false);
    // setCheckAllAdmin(e.target.checked);
  };
  //ONCHANGE SUPER
  const onCheckAllChangeSuper = (e) => {
  setRole(e.target.value);
  setValue(e.target.value);
  let plainWithoutUser =!disabledAdmin? plain.filter((p) => p.label!=='Usuarios'):plain;
  setCheckedList(e.target.checked ? plainWithoutUser.map(p=>p.value)  : []);
  const notUser= plain.map(pl=>{if(pl.label==='Usuarios') return({...pl,disabled:true});
  return({...pl,disabled:false})
  })
 setPlain(notUser);
  };
  //ONCHAGE USUARIO
const onCheckAllChangeUser = (e) => {
 // setData({...data,role:e.target.checked?e.target.value:'',list:e.target.checked ? plain.filter(p=>p.label!=='Usuarios'&& p.label!=='Aprobaciones').map(p=>p.value): []})
setRole(e.target.value)
setValue(e.target.value)
//setCheckedList({...data,role:e.target.checked?e.target.value:'',list:e.target.checked ? plain.filter(p=>p.label!=='Usuarios'&& p.label!=='Aprobaciones').map(p=>p.value): []})

  const notUser= plain.map(pl=>{if(pl.label==='Usuarios') return({...pl,disabled:true});
  if(pl.label==='Aprobaciones') return({...pl,disabled:true})
  return ({...pl,disabled:false})
  })

  setCheckedList(e.target.checked ? plain.filter(p=>p.label!=='Usuarios'&& p.label!=='Aprobaciones'): []);
  setPlain(notUser)
 setValue(e.target.value);

};
  const onChangeRadio = (e) => {
    switch (e.target.value) {
      case 'admin':
        return onCheckAllChangeAdmin(e);
        case 'super': 
        return onCheckAllChangeSuper(e);
        
          case 'user':
            return onCheckAllChangeUser(e);
      default:
        break;
    }
  };
 // console.log(plain);
  console.log(checkedList);
  return (
    <Form
      className="form-complete"
      style={{ width: 700 }}
      onFinish={onFinish}
      initialValues={{
        prefix: "11",
      }}
    >
      <Button type="link" onClick={() => navigate(-1)} size="large">
        Volver
      </Button>
      <Titulo titulo="Registro de Empleados" />
      <Divider />

      <Row gutter={10}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item
            name="departamentoId"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Seleccione un dto!",
              },
            ]}
          >
            <Select placeholder="Departamento">
              {dtos.map((d) => (
                <Option value={d.id} key={d.id}>
                  {d.departamento}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="nombre"
            rules={[
              {
                required: true,
                message: "Ingrese un nombre!",
              },
            ]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>

          <Form.Item
            name="apellido"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Ingresa un Apellido!",
              },
            ]}
          >
            <Input placeholder="Apellido" />
          </Form.Item>

          <Form.Item
            name="email"
            hasFeedback
            rules={[
              {
                type: "email",
                message: "No es un E-mail valido!",
              },
              {
                required: true,
                message: "Ingrese un  E-mail!",
              },
            ]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="password"
            placeholder="Contraseña"
            rules={[
              {
                required: true,
                message: "Ingrese una Contrasena!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>

          <Form.Item
            name="password2"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirme Contraseña" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item
            name="tipousuario"
            rules={[{ required: true, message: " !Seleccione una opcion!" }]}
            hasFeedback
          >
            <Select placeholder="Tipo de usuario">
              <Option value="Gerente">Gerente</Option>
              {/* <Option value="Empleada">Empleada</Option> */}
              <Option value="Empleado">Empleado</Option>
              {/* <Option>Visitante</Option> */}
            </Select>
          </Form.Item>

          <Form.Item
            name="gerenteId"
            rules={[{ required: true, message: " !Seleccione una opcion!" }]}
            hasFeedback
          >
            <Select placeholder="Reportar a">
              <Option value={1}>Esteban Ramos</Option>
              <Option value={3}>Cristian Rios</Option>
              <Option value={2}>Cristian DeSousa</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="categoria"
            rules={[
              {
                required: true,
                message: "Ingrese una categoria!",
              },
            ]}
            hasFeedback
          >
            <Select placeholder="Categoria">
              <Option value="interno">Interno</Option>
              <Option value="externo">Externo</Option>
            </Select>
          </Form.Item>

         {/*  <Form.Item
            name="nvendedor"
            tooltip={{ title: "Si no es un vendedor ingresar 0000" }}
            rules={[
              {
                required: true,
                message: "Ingrese numero de vendedor!",
              },
            ]}
            hasFeedback
          >
            <Input type="number" placeholder=" Vendedor" />
          </Form.Item> */}

          <Form.Item
            name="cel"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
            hasFeedback
          >
            <Input type="number" placeholder="Celular" />
          </Form.Item>
          <Form.Item
            name="fechaContratacion"
            rules={[
              {
                required: true,
                message: "Ingrese una fecha de contratacion!",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              placeholder="Fecha de Contratacion"
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              onChange={onChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item  label="Role">
    {/*   <Checkbox name="admin" indeterminate={indeterminate} onChange={onCheckAllChangeAdmin} checked={checkAllAdmin} disabled={disabledAdmin}>
        Admin
      </Checkbox>
      <Checkbox name="super" indeterminate={indeterminate} onChange={onCheckAllChangeSuper} checked={checkAllSuper} disabled={disabledSuper}>
          Super
      </Checkbox> */}
      <Radio.Group onChange={onChangeRadio} value={value}>
      <Radio value='admin'>Administrador</Radio>
      <Radio value='super'>SuperUsuario</Radio>
      <Radio value='user'>Usuario</Radio>
    </Radio.Group>
      </Form.Item>
      <Divider />
      <Form.Item  label="Permisos">

      <Checkbox.Group
      options={plain}//{
      //   label: p.label,
      //   value: p.value,
      //   disabled: true,
      // }
      onChange={onChangeCheck}
      value={checkedList}//[1,2,3,4,5,6,7]
    />
    </Form.Item>
      

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  );
};
