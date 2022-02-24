import React, { useState, useEffect } from "react";
import { axiosURL } from "../../config/axiosURL";
import { Form, Input, Button,Select,Spin, Divider } from "antd";
import "./css/editarRendicion.css";
import TextArea from "antd/lib/input/TextArea";
import { categorias } from "./categorias";
import { PeticionGET } from "../../config/PeticionGET";
import { Files } from "../../helpers/Files"
import { useNavigate, useParams } from "react-router";

export const EditarRendicion = ( ) => {
  const  navigate=useNavigate();
  const { id } = useParams();
  const { Option } = Select;
 const [spinner, setSpinner] = useState(false)
  const [rendicionEditar, setRendicionEditar] = useState({
    nota: "",
    importe: "",
    categoria: "",
  });
  const { nota, importe, categoria,  gastoId } = rendicionEditar;
  useEffect(() => {
    const peticionID = async () => {
      let res = await axiosURL.get(`/rendicion/${id}`);
      setRendicionEditar(res.data);
    };
    peticionID();
  }, [id]);

  const editarGasto = async (values) => {
    setSpinner(true);
    let f = new FormData();
      f.append("file", values.file?.[0]?.originFileObj);
      f.append('nota',nota);
      f.append('importe',importe);
      f.append('categoria',categoria);
    let result = await axiosURL.post(`/rendicion/gastos/img/${id}`, f);

    if(result.data?.error?.errno===-3008){
      alert('Compruebe su connexion!!!')
    }
    
    if (result.data.status===200) {
     navigate(`/lista/rendicion/${gastoId}`);
    }
    setSpinner(false)
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRendicionEditar({
      ...rendicionEditar,
      [name]: value,
    });
  };
  const onChange = (values) => {
    setRendicionEditar({
      ...rendicionEditar,
      categoria: values,
    });
  };

  /** Boton para volver atras */

  const handleBack = () => navigate(`/lista/rendicion/${gastoId}`);
  const peticionGastoId = PeticionGET(`/gastos/${gastoId}`);
  const todasLasRendicones = peticionGastoId?.rendicion;
  const sumaGastos = todasLasRendicones?.map((sg) => sg.importe);
  const totalDeImporte = sumaGastos?.reduce((acumulador, item) => {
    return (acumulador = parseFloat(acumulador) + parseFloat(item));
  });
  const peticionRendicion = PeticionGET(`/rendicion/${id}`);
  const resta = totalDeImporte - parseFloat(peticionRendicion.importe); //Es para verificar
 // const total = resta + parseFloat(importe); //Declarado en el estado

  return (
    <>
  <Spin tip="Cargando..." spinning={spinner}  className='spinner'>
         <Form
          onFinish={editarGasto}
          onChange={handleChange}
          layout="vertical"
          className="form-complete"
          size='large'
          >
          <h3 style={{ textAlign: "center", marginLeft: "32px" ,marginTop:20}}>
            
            Editar Rendicion
            <Button className="btn-rendicion" onClick={handleBack} style={{marginLeft:20}}>
              X
            </Button>
          </h3>
          <Divider />
          <Form.Item>
            <Select value={categoria} onChange={onChange}>
              {categorias.map((c) => (
                <Option key={c.id} name="categoria" value={c.categoria}>
                  {c.categoria}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item   >
            <Input name="importe" value={importe} type='number' placeholder='Importe' />
          </Form.Item>

          <Form.Item >
            <TextArea
              name="nota"
            placeholder="Nota"
              value={nota}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
                    <Files  obli={categoria?true:false}/>     
          <Form.Item>
            <Button className="btn" htmlType="submit" block>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};
