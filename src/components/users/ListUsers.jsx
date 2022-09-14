import { ArrowRightOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export const ListUsers = () => {
  const [listUsers] = useGet("/allusers");
  const navigate = useNavigate();
  return (
    <List
      className="form-complete"
      header={
        <Button type="primary" onClick={() => navigate("/registrar/usuario")}>
          Nuevo Usuario
        </Button>
      }
      dataSource={listUsers}
      loading={listUsers.length===0?true:false}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <Link to={`/editar/usuario/${item.id}`} key="list-loadmore-edit">
              Editar
            </Link>,
            <a key="list-loadmore-more">Eliminar</a>,
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
