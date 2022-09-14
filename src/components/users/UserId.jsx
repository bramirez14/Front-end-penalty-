import { useGet } from "../../hooks/useGet";
import { useNavigate, useParams } from "react-router";
import { Button, Descriptions, Typography, Divider } from "antd";

const { Title } = Typography;

export const UserId = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userId] = useGet(`${id}`);
  return (
    <div className="form-complete">
      <Button type="link" onClick={() => navigate(-1)} size="large">
        Volver
      </Button>
      <Title level={3} style={{ textAlign: "center" }}>
        {" "}
        Perfil del Empleado{" "}
      </Title>
      <Divider />

      <Descriptions title={`${userId.nombre}, ${userId.apellido}`}>
        <Descriptions.Item label={<strong>Email</strong>}>
          {userId.email}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Usuario</strong>}>
          {userId.tipousuario}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Contratado</strong>}>
          {userId.fechaContratacion}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Celular</strong>}>
          {userId.cel}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>N Vendedor</strong>}>
          {userId.nvendedor}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Celular</strong>}>
          {userId.cel}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Departamento</strong>}>
          {userId.departamento?.departamento}
        </Descriptions.Item>
        <Descriptions.Item label={<strong>Categoria</strong>}>
          {userId.categoria}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
