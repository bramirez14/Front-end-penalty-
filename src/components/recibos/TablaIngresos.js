import React, { useState } from "react";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { HelperTABLEobj } from "../../helpers/HelperTABLEobj";
import { Form, Input, Select, DatePicker, Card } from "antd";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { numberWithCommas } from "../reportes/helpers/funciones";

const { Option } = Select;
export const TablaIngresos = ({data,setData,setEfectivo,setCheques,setRetenciones,setDepositos,screens,ref}) => {
  const [contador, setContador] = useState(1)
  const [ingresosData, setIngresosData] = useState({
    key:'',
    mpago: "Efectivo",
    cheque: "",
    fecha: new Date().toLocaleDateString(),
    importe: "",
  });
  const {cheque,importe,mpago}=ingresosData

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setIngresosData({ ...ingresosData, [name]: value });
  };
  const handleChangePicker = (e, data) =>
    setIngresosData({ ...ingresosData, fecha: data });
  
    const handleChangeSelect = (value) =>setIngresosData({ ...ingresosData, mpago: value,cheque:'',importe:'' });

  

    const handelDelete=(key) => {
      const filtro= data.filter(a=> a.key!== key)
      setData(filtro)
      setEfectivo([]);
      setRetenciones([]);
      setDepositos([]);
      setCheques([]);
    }
  const columns = [
    {
      title: "MEDIOS DE PAGO",
      dataIndex: "mpago",
      key: "mpago",
      lupa: false,
      width:100,
      render:(state, file)=><h5>{ file.mpago }</h5>

    },
    {
      title: "DESCRIPCION",
      dataIndex: "cheque",
      key: "cheque",
      lupa: false,
      width:120,

      render:(state, file)=><h5>{ file.cheque }</h5>
      
    },
    {
      title: "FECHA",
      dataIndex: "fecha",
      key: "fecha",
      lupa: false,
      width:100,

      render:(state, file)=><h5>{ file.fecha }</h5>

    },
    {
      title: "IMPORTE",
      dataIndex: "importe",
      key: "importe",
      lupa: false,
      width:100,

      render:(state, file)=><h5>${ numberWithCommas(file.importe)}</h5>
    },
    {
      title: "",
      dataIndex: "acciones",
      key: "acciones",
      lupa: false,
      width:70,

      render:(state,file)=>{
          return(<DeleteOutlined onClick={()=>handelDelete(file.key)} />)
      }
    },

  ];
  const dataSource= data

  const guardarArr=() => {
    const datos=[...data,ingresosData]
    setData([...data,
      {...ingresosData,key:contador}
    ])
    setIngresosData( {
    mpago: "Efectivo",
    cheque: "",
    fecha: new Date().toLocaleDateString(),
    importe: "",});
    setContador(contador+1)
    const efctivo= datos.filter(d => d.mpago ==='Efectivo');
    const cheques = datos.filter(d => d.mpago === 'Cheque')
    const retenciones = datos.filter(d => d.mpago === 'Retenciones');
    const depositos = datos.filter(d => d.mpago === 'Deposito');

    setEfectivo(efctivo);
    setCheques(cheques);
    setRetenciones(retenciones);
    setDepositos(depositos)
  
   
  }
 // filtrado de operacion
 console.log(ingresosData,'line115')
  return (
    <Card>
    <HelperTABLEobj
      title={
        <h2 style={{ textAlign: "center" }}>
          <b> INGRESOS </b>
        </h2>
      }
      columns={columns}
      data={dataSource}
      bordered={false}
       y={screens.xs===false?'':400}
      footer={
        <HelperMODAL
          noclick={() => {}}
          boton={"Agregar"}
          title={"Datos"}
          Return={"Cancelar"}
          Submit={"Guardar"}
          longModal={300}
          click={guardarArr}
        >
         
          <Form onChange={handleChange} >
            <Form.Item
            >
              <Select value={mpago} onChange={handleChangeSelect}>
                <Option value="Cheque">Cheque</Option>
                <Option value="Retenciones">Retenciones</Option>
                <Option value="Efectivo">Efectivo</Option>
                <Option value="Deposito">Deposito</Option>

              </Select>
            </Form.Item>
              <Form.Item
              >
              {
                  mpago === 'Efectivo'?
                <Input disabled />:
                <Input name="cheque" type='text' placeholder="data" value={cheque} />
              }
            </Form.Item>

            <Form.Item
              name="fecha"
            >
              <DatePicker
                style={{ width: 251 }}
                onChange={handleChangePicker}
                defaultValue={moment(new Date(), "DD/MM/YYYY")}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
            <Form.Item
            >
              <Input type="number" name="importe" value={importe} placeholder='Importe' />
            </Form.Item>
          </Form>
        </HelperMODAL>
      }
    />
  </Card>
  );
};

