import React, { useState } from "react";
import { fecha } from "../../../helpers/funcioneshelpers";
import { useDispatch, useSelector } from "react-redux";
import { abrirModal, datoSelec, editarSCC } from "../../../redux/actions/scc";
import { Checkbox, Button } from "antd";
import Swal from "sweetalert2";
import { Loading } from "../../../loading/Loading";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const ColumnaSCC = () => {
  const dispatch = useDispatch();
  const { solicitudControlCalidad, articulos, listaTalles } = useSelector(
    (state) => state
  );

  function onChangeRechazar(file) {
    if (file.RECHAZADO === "S") {
      dispatch(
        editarSCC(file.NROSCC, {
          ...file,
          RECHAZADO: "N",
          APROBDEP: "N",
          APROBCRED: "N",
        })
      );
    } else {
      Swal.fire({
        title: "Estas seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        
        confirmButtonText: "Si!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            editarSCC(file.NROSCC, {
              ...file,
              RECHAZADO: "S",
              APROBDEP: "N",
              APROBCRED: "N",
            })
          );
          Swal.fire("Eliminado!", "Los datos fueron eliminados.", "success");
        }
      });
    }
  }
  const buscarNombrePorArt = (art) => {
    const buscarNomArt = articulos.art?.find((t) => t.NUMERO === art);
    const numTalle = buscarNomArt?.CODTALLE;
    const curvaTalles = listaTalles?.talle?.find(
      (l) => l.TRANSPORTISTA === numTalle
    );
    return curvaTalles;
  };

  const click = (file) => {
    if (file.APROBDEP !== "S") {
      dispatch(abrirModal());
      const curva = buscarNombrePorArt(file.ARTICULO);
      const newFile = { ...file, ...curva };
      dispatch(datoSelec(newFile));
    } else {
      Swal.fire({
        title: "Estas seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            editarSCC(file.NROSCC, { ...file, APROBDEP: "N", APROBCRED: "N" })
          );
          Swal.fire("Eliminado!", "Los datos fueron eliminados.", "success");
        }
      });
    }
  };
  return [
    {
      title: "Dep",
      dataIndex: "Dep",
      render: (state, file) => (
        <>
          <Checkbox
            onChange={() => click(file)}
            checked={file.APROBDEP === "S"}
          />
        </>
      ),
    },
    {
      title: "Cre",
      dataIndex: "Cre",
      render: (state, file) => <Checkbox checked={file.APROBCRED === "S"} />,
    },
    {
      title: "Rec",
      dataIndex: "Rec",
      render: (state, file) => (
        <Checkbox
          onChange={() => onChangeRechazar(file)}
          checked={file.RECHAZADO === "S"}
        />
      ),
    },

    {
      title: "Fecha",
      dataIndex: "FECEMISION",
      render: (state, file) => <p> {fecha(file.FECEMISION)} </p>,
    },
    {
      title: "SCC",
      dataIndex: "NROSCC",
    },
    {
      title: "Cte",
      dataIndex: "CLIENTE",
    },
    {
      title: "Articulo",
      dataIndex: "ARTICULO",
    },
    {
      title: "Descrip",
      dataIndex: "Descrip",
    },
    {
      title: "Precio Lista",
      dataIndex: "PRECIOLIST",
    },
    {
      title: "Precio Fact",
      dataIndex: "PRECFACT",
    },
    {
      title: "Fecha Fact",
      dataIndex: "FECFACT",
      render: (state, file) => <p> {fecha(file.FECFACT)} </p>,
    },
    {
      title: "Total",
      dataIndex: "CANTPED",
    },

    {
      title: "T1",
      dataIndex: "CANTPEDT00",
    },
    {
      title: "T2",
      dataIndex: "CANTPEDT01",
    },
    {
      title: "T3",
      dataIndex: "CANTPEDT02",
    },
    {
      title: "T4",
      dataIndex: "CANTPEDT03",
    },
    {
      title: "T5",
      dataIndex: "CANTPEDT04",
    },
    {
      title: "T6",
      dataIndex: "CANTPEDT05",
    },
    {
      title: "T7",
      dataIndex: "CANTPEDT06",
    },
    {
      title: "T8",
      dataIndex: "CANTPEDT07",
    },
    {
      title: "T9",
      dataIndex: "CANTPEDT08",
    },
    {
      title: "T10",
      dataIndex: "CANTPEDT09",
    },
    {
      title: "T11",
      dataIndex: "CANTPEDT10",
    },
    {
      title: "T12",
      dataIndex: "CANTPEDT11",
    },
    {
      title: "T13",
      dataIndex: "CANTPEDT12",
    },
    {
      title: "T14",
      dataIndex: "CANTPEDT13",
    },
    {
      title: "T15",
      dataIndex: "CANTPEDT14",
    },
    {
      title: "Precio",
      dataIndex: "PRECIO",
    },
  ];
};
