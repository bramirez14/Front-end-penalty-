import {Row,Col, Descriptions, Card,Form, Input, Button} from 'antd'
import { PeticionGETIntranetCobranzas } from '../../config/PeticionGET'
import { HelperTABLEobj } from '../../helpers/HelperTABLEobj'
import { numberWithCommas } from '../reportes/helpers/funciones';
import { EnterOutlined, FieldNumberOutlined } from '@ant-design/icons';
import { axiosURLIntranetCobranzas } from '../../config/axiosURL';
import {Spinner} from '../spin/Spinner'
import { useNavigate,useParams } from 'react-router-dom';

export const CargaRecibo = () => {
  const navigate= useNavigate();
 /**evitar que usuari 907 ingresen a la ruta */
 const N = localStorage.getItem('N');
 ( N !== "907" && N!== '901' ) && navigate("/perfil");
  const { id } = useParams();
    const getRecibos= PeticionGETIntranetCobranzas(`detalle/recibo/${id}`);
    const columns = [
        {
          title: "Cliente",
          dataIndex: "cliente",
          key: "cliente",
          lupa: false,
      width:100,

          render:(state, file)=><h5>{ file.cliente }</h5>
    
        },
        {
          title: "Razon Social",
          dataIndex: "razonsocial",
          key: "razonsocial",
          lupa: false,
      width:100,

          render:(state, file)=><h5>{ file.razonsocial}</h5>
          
        },
        {
          title: "Factura",
          dataIndex: "factura",
          key: "factura",
          lupa: false,
      width:100,

          render:(state, file)=><h5>{ file.factura }</h5>
    
        },
        {
          title: "Fecha Emision",
          dataIndex: "fecha",
          key: "fecha",
          lupa: false,
      width:100,

          render:(state, file)=><h5>${ numberWithCommas(file.fecha)}</h5>
        },
        {
            title: "Fecha Venc",
            dataIndex: "fechavencimiento",
            key: "fechavencimiento",
            lupa: false,
      width:100,

            render:(state, file)=><h5>${ numberWithCommas(file.fechavencimiento)}</h5>
          },
          {
            title: "Importe",
            dataIndex: "importe",
            key: "importe",
            lupa: false,
      width:100,

            render:(state, file)=><h5>${ numberWithCommas(file.importe)}</h5>
          },
      
    
      ];
      const col = [
    
        {
          title: "Medio de pago",
          dataIndex: "mpago",
          key: "mpago",
          lupa: false,
          width:100,
          render:(state, file)=><h5>{ file.mpago}</h5>
          
        },
        {
          title: "N° de Cheque",
          dataIndex: "cheque",
          key: "cheque",
          lupa: false,
          width:100,

          render:(state, file)=><h5>{ file.cheque }</h5>
    
        },
        {
          title: "Fecha",
          dataIndex: "fecha",
          key: "fecha",
          lupa: false,
          width:140,

          render:(state, file)=><h5>${ file.fecha}</h5>
        },
        
          {
            title: "Importe",
            dataIndex: "importe",
            key: "importe",
            lupa: false,
          width:100,

            render:(state, file)=><h5>${ numberWithCommas(file.importe)}</h5>
          },
      
    
      ];
      //alert("La resolución de tu pantalla es: " + window.screen.width + " x " + window.screen.height) 

      const handleSubmit=async(values)=>{
     await axiosURLIntranetCobranzas.put(`/recibo/comprobante/${id}`,values)
     //agregar una alerta 
      navigate('/lista/recibo')
    }
    console.log(getRecibos===[ ])
    return (
        <>
          { getRecibos.length===0 ?
          <Spinner/>:
          <>
          <Row style={{marginTop:20}} >
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <Card>
        <Descriptions title="Info">
    <Descriptions.Item label="Enviado por">
      <b>
        {getRecibos[1]?.[0]?.nombrecompleto} 
      </b>
     </Descriptions.Item>
    <Descriptions.Item label="Fecha">
      <b>
        {getRecibos[0]?.[0]?.fecha}
        </b></Descriptions.Item>
    <Descriptions.Item label="N° recibo">
      <b>
        {getRecibos[1]?.[0]?.numerorecibo }
      </b>
     </Descriptions.Item>
    <Descriptions.Item label="Razon Social ">
      <b>
       {getRecibos[1]?.[0]?.razonsocial} 
      </b>
      </Descriptions.Item>
  
  </Descriptions>

      </Card>
      </Col>
    </Row>
        <Row gutter={[20, 20]} style={{marginTop:20}}>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <Card>
               <HelperTABLEobj
        title={<h2 style={{textAlign:'center'}}>  <b> Ingreso de Facturacion </b> </h2>}
        columns={columns}
        data={getRecibos[1]}
        y={350}
        bordered={false}
        
        />
            </Card>
       

          </Col>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <Card>
            <HelperTABLEobj
        title={<h2 style={{textAlign:'center'}}>  <b> Ingreso de Importe </b> </h2>}
        columns={col}
        data={getRecibos[0]}
        y={350}
        bordered={false}
        
        /> 
          </Card>
          
          </Col>
        </Row>

{ !!getRecibos[1]?.[0]?.ncomprobante?'':
 <Row style={{marginTop:20}} >
       <Col xs={24} sm={24} md={24} lg={24} xl={24}>
       <Card>

         <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item
        name='ncomprobante'
        rules={[
          {
            required: true,
            message: 'Please input your number!',
          },
        ]}
      >
        <Input prefix={<FieldNumberOutlined className="site-form-item-icon" />} placeholder="de comprobante" type='number' />
      </Form.Item>
      <Form.Item >
   
       <Button style={{ borderRadius:10,backgroundColor:'#46a461',color:'#ffff',height:38,borderColor:'#46a461'}}
        htmlType="submit"
        >Finalizar
        </Button>
      
       
      </Form.Item>
      </Form>
       </Card>
      
      </Col>

       </Row>

}
<Button type='link' onClick={()=>navigate('/lista/recibo')}> atras <EnterOutlined/></Button>
  </>    
}
        
        </>
    )
}
