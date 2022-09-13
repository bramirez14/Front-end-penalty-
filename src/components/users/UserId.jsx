import { useGet } from '../../hooks/useGet'
import { useNavigate, useParams } from "react-router";
import { Descriptions } from 'antd';


export const UserId = () => {
    const  navigate=useNavigate();
    const { id } = useParams();
    const [userId] = useGet(`${id}`);
    console.log(userId);
  return (
    <Descriptions title={`${userId.nombre}, ${userId.apellido}` }className='form-complete' style={{width:'auto'}}>
    <Descriptions.Item label="Email">{userId.email}</Descriptions.Item>
    <Descriptions.Item label="Usuario">{userId.tipousuario}</Descriptions.Item>
    <Descriptions.Item label="Contratado">{userId.fechaContratacion}</Descriptions.Item>
    <Descriptions.Item label="Celular">{userId.cel}</Descriptions.Item>
    <Descriptions.Item label="N Vendedor">{userId.nvendedor}</Descriptions.Item>
    <Descriptions.Item label="Celular">{userId.cel}</Descriptions.Item>
    <Descriptions.Item label="Departamento">{userId.departamento?.departamento}</Descriptions.Item>

  </Descriptions>
  )
}
