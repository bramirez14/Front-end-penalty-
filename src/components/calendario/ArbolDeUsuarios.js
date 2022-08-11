import React from "react";
import { Tree, Avatar } from "antd";

export const ArbolDeUsuarios = ({ vacaciones = [] }) => {
  const arbolVacacionesEditadas = vacaciones.map((v) => ({
    title: (
      <h3>
        <Avatar src={v.usuario.imagen} />
        <b> {`${v.usuario.nombre} ${v.usuario.apellido}`} </b>{" "}
      </h3>
    ),
    key: v.id,
    children: [
      {
        title: (
          <>
            <p>periodo: {v.periodo}</p>
            <p>mensaje: {v.obs}</p>
            <p>fecha desde: {v.fechaDesde}</p>
            <p>fechaHasta: {v.fechaHasta}</p>
            <p>fecha de Solicitud: {v.fechaSolicitud}</p>
            <p>Estado: {v.estadoFinal}</p>
          </>
        ),
      },
    ],
  }));

  return (
    <>
      <Tree treeData={arbolVacacionesEditadas} style={{ marginTop: 20 }} />
    </>
  );
};
