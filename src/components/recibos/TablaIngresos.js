import React, { useState } from "react";
import { HelperMODAL } from "../../helpers/HelperMODAL";
import { HelperTABLEobj } from "../../helpers/HelperTABLEobj";
import { Form, Input, Select, DatePicker, Card } from "antd";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import { numberWithCommas } from "../reportes/helpers/funciones";

const { Option } = Select;
export const TablaIngresos = ({data,setData,setEfectivo,setCheques,setRetenciones}) => {
  const [contador, setContador] = useState(1)
  const [ingresosData, setIngresosData] = useState({
    key:'',
    mpago: "Efectivo",
    cheque: "No hay!!!",
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
  const handleChangeSelect = (value) =>
  value==='Efectivo'||value==='Retenciones'?
  setIngresosData({ ...ingresosData, mpago: value,cheque:'No hay!!!' })
  :
  setIngresosData({ ...ingresosData, mpago: value,cheque:'', })

    const handelDelete=(key) => {
      const filtro= data.filter(a=> a.key!== key)
      setData(filtro)
    }
console.log(ingresosData);
  const columns = [
    {
      title: "MEDIOS DE PAGO",
      dataIndex: "mpago",
      key: "mpago",
      lupa: false,
      render:(state, file)=><h5>{ file.mpago }</h5>

    },
    {
      title: "CHEQUES",
      dataIndex: "cheque",
      key: "cheque",
      lupa: false,
      render:(state, file)=><h5>{ file.cheque }</h5>
      
    },
    {
      title: "FECHA",
      dataIndex: "fecha",
      key: "fecha",
      lupa: false,
      render:(state, file)=><h5>{ file.fecha }</h5>

    },
    {
      title: "IMPORTE",
      dataIndex: "importe",
      key: "importe",
      lupa: false,
      render:(state, file)=><h5>${ numberWithCommas(file.importe)}</h5>
    },
    {
      title: "ACCIONES",
      dataIndex: "acciones",
      key: "acciones",
      lupa: false,
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
    cheque: "No hay!!!",
    fecha: new Date().toLocaleDateString(),
    importe: "",});
    setContador(contador+1)
    const efctivo= datos.filter(d => d.mpago ==='Efectivo');
    const cheques = datos.filter(d => d.mpago === 'Cheque')
    const retenciones = datos.filter(d => d.mpago === 'Retenciones');
    setEfectivo(efctivo);
    setCheques(cheques);
    setRetenciones(retenciones);
  
   
  }
 // filtrado de operacion

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
          <Form onChange={handleChange}>
            <Form.Item
            >
              <Select value={mpago} onChange={handleChangeSelect}>
                <Option value="Cheque">Cheque</Option>
                <Option value="Retenciones">Retenciones</Option>
                <Option value="Efectivo">Efectivo</Option>
              </Select>
            </Form.Item>
              <Form.Item
              >
              {
                  mpago !== 'Cheque'?
                <Input disabled />:
                <Input name="cheque" placeholder="N° cheque" value={cheque} />
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

