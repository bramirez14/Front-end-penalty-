import { useSelector } from "react-redux";
import { Descriptions } from 'antd';
export const DescripcionUsuario = () => {
  const { peticiones_GET } = useSelector((state) => state);
  const usuario = peticiones_GET.usuario;
  return (
        <Descriptions title="Informacion" layout="vertical" bordered>
    <Descriptions.Item label="Nombre"> {usuario?.nombre} </Descriptions.Item>
    <Descriptions.Item label="Apellido">{usuario?.apellido}</Descriptions.Item>
    <Descriptions.Item label="Email">{usuario?.email}</Descriptions.Item>
    <Descriptions.Item label="Cel">{usuario?.cel}</Descriptions.Item>
    <Descriptions.Item label="Sector" span={2}>
      {usuario?.departamento.departamento}
    </Descriptions.Item>
    <Descriptions.Item label="Gerente" >
      {usuario?.gerente.nombre} {usuario?.gerente.apellido}
    </Descriptions.Item>
    <Descriptions.Item label="Email">{usuario?.gerente.email}</Descriptions.Item>

  </Descriptions>
    )
}
