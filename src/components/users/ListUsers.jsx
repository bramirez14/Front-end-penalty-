import { ArrowRightOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { axiosURL } from "../../config/axiosURL";
import Swal from "sweetalert2";

export const ListUsers = () => {
  const navigate = useNavigate();
  const [listUsers, setListUsers] = useState([]);
  const axiosGet = async () => {
    let res = await axiosURL.get("allusers");
    setListUsers(res.data);
  };
  useEffect(() => {
    axiosGet();
  }, []);

  return (
    <List
      className="form-complete"
      header={
        <Button type="primary" onClick={() => navigate("/registrar/usuario")}>
          Nuevo Usuario
        </Button>
      }
      dataSource={listUsers}
      loading={listUsers.length === 0 ? true : false}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <Link to={`/editar/usuario/${item.id}`} key="list-loadmore-edit">
              Editar
            </Link>,
            <Button
              type="link"
              onClick={async () => {
                Swal.fire({
                  title: "¿Estas seguro?",
                  text: "¡No podras revertir este operacion!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Borrar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    axiosURL.delete(`/delete/user/${item.id}`);
                    Swal.fire("Deleted!", "Se borro con exito.", "success");
                    let filterUsers = listUsers.filter((l) => l.id !== item.id);
                    setListUsers(filterUsers);
                  }
                });
              }}
            >
              Eliminar
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.imagen} />}
            title={<a href="https://ant.design">{item.nombre}</a>}
            description={item.email}
          />
          <Link to={`/usuario/${item.id}`}>
            <ArrowRightOutlined />
          </Link>
        </List.Item>
      )}
    />
  );
};
