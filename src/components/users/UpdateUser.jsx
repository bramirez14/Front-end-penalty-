import { Button, Form, Input, Select, Typography, Divider, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosURL } from "../config/axiosURL";
import Swal from "sweetalert2";


const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
];
const { Option } = Select;
const { Title } = Typography;
export const UpdateUser = () => {
//State de permisos
const [checkedList, setCheckedList] = useState([]);
const [plain, setPlain] = useState([])
const [data, setData] = useState({role:'',list:[]});
const allPermissions = async () => {
  const { data } = await axiosURL.get("/permissions/all");
  let plainOptions = data.map((p) => ( {
  label: p.permission,
  value: p.id,
}));
setPlain(plainOptions);
};

useEffect(() => {
  allPermissions();
}, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState();
  const axiosGet = async () => {
    let { data } = await axiosURL.get(`/${id}`);
    
    const dataId=data.permissions.map(d=> d.id);
    setData({role:data.role,list:dataId,listdelete:dataId});
    setFields([
      {
        name: ["nombre"],
        value: data.nombre,
      },
      {
        name: ["apellido"],
        value: data.apellido,
      },
      {
        name: ["email"],
        value: data.email,
      },
      {
        name: ["nvendedor"],
        value: data.nvendedor,
      },
      {
        name: ["tipousuario"],
        value: data.tipousuario,
      },
      {
        name: ["fechaContratacion"],
        value: data.fechaContratacion,
      },
      {
        name: ["cel"],
        value: data.cel,
      },
      {
        name: ["categoria"],
        value: data.categoria,
      },
    ]);
  };

  useEffect(() => {
    axiosGet();
  }, []);
  const onFinish = async (values) => {
     if(data.role==='admin'&& plain.length!==data.list.length)return alert('Rol de administrador tiene que tener acesos a todos los permisos')
     if(data.role==='super' && data.list.includes(1)) return alert('Rol de super usuario no debe incluir el permiso de Usuarios')
     if((plain.length -1) !== data.list.length  && data.role==='super') alert('El Rol de super usuario debe contener todos los permisos menos el de Usuarios')
    
    const isConfirmed = await Swal.fire({
      title: "Estas seguro",
      text: "¡NO podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar!",
    });
    if (isConfirmed) {
      const res = await axiosURL.put(`/editar/usuario/${id}`,{ ...values,role:data.role?data.role:null,checkedList,checkedListDelete:data.listdelete});
      Swal.fire("Editado!", "Se edito con exito!!!", "success");
      //if(res.status === 200)navigate('/lista/usuarios')
      console.log(res);
    }
  };

  // PERMISOS
  const onChangeCheck = (list) => {
    setData({...data,list:list})
    setCheckedList(list);
  };
  const onCheckAllChangeAdmin = (e) => {
       setData({...data,role:e.target.checked?e.target.name:'',list:e.target.checked ? plain.map(p=>p.value): []})
    };

    const onCheckAllChangeSuper = (e) => {
      setData({...data,role:e.target.checked?e.target.name:'',list:e.target.checked ? plain.filter(p=>p.label!=='Usuarios').map(p=>p.value): []})

    };
console.log(data,'IS DATA');
console.log(plain,'is plain');
  return (
    <>
      <Form
        className="form-complete"
        fields={fields}
        onFieldsChange={(_, allFields) => {
          setFields(allFields);
        }}
        onFinish={onFinish}
      >
        <Button type="link" onClick={() => navigate(-1)} size="large">
          Volver
        </Button>
        <Title level={3} style={{ textAlign: "center" }}>
          {" "}
          Editar Empleado{" "}
        </Title>
        <Divider />
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="apellido"
          label="Apellido"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name="nvendedor"
          label="N vendedor"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item name="tipousuario" label="Usuario" hasFeedback rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}>
          <Select placeholder="Tipo de usuario">
            <Option value="Gerente">Gerente</Option>
            <Option value="Empleada">Empleada</Option>
            <Option value="Empleado">Empleado</Option>
            <Option>Visitante</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fechaContratacion"
          label="Contrato"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Contrato" />
        </Form.Item>
        <Form.Item
          name="cel"
          label="Celular"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Celular" />
        </Form.Item>
        <Form.Item name="epassword" label="Contraseña" hasFeedback>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item
          name="epassword2"
          label="Repita Contraseña"
          dependencies={["epassword"]}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("epassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirme Contraseña" />
        </Form.Item>

        <Form.Item name="categoria" label="Categoria"  hasFeedback rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}>
          <Select placeholder="Categoria">
            <Option value="interno">Interno</Option>
            <Option value="externo">Externo</Option>
          </Select>
        </Form.Item>
        {/* permisos */}
        <Form.Item  label="Role">
      <Checkbox name="admin"  onChange={onCheckAllChangeAdmin} checked={data.role==='admin'}
       >
        Admin
      </Checkbox>
      <Checkbox name="super" onChange={onCheckAllChangeSuper} checked={data.role==='super'} 
      >
          Super
      </Checkbox>
      </Form.Item>

      <Divider />
      <Form.Item  label="Permisos">
      
      <Checkbox.Group
      options={plain}
      onChange={onChangeCheck}
      value={data.list}
     //[1,2,3,4,5,6,7]
    />
</Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Editar Empleado
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
