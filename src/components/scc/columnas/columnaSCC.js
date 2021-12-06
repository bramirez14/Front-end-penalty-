import React, { useState } from "react";
import { fecha } from "../../../helpers/funcioneshelpers";
import { useDispatch, useSelector } from "react-redux";
import { abrirModal, datoSelec, editarSCC } from "../../../redux/actions/scc";
import { Checkbox, Button } from "antd";
import Swal from 'sweetalert2'
import { Loading } from "../../../loading/Loading";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const ColumnaSCC = () => {
  const dispatch = useDispatch();
  const { solicitudControlCalidad, articulos, listaTalles } = useSelector(
    (state) => state
  );
  const status= solicitudControlCalidad.status;
  console.log(status);
  const [aprobado, setAprobado] = useState(false);
  const [cancelado, setCancelado] = useState(false);
  function onChangeRechazar(file) {
  if(file.RECHAZADO==='S'){
    dispatch(
      editarSCC(file.NROSCC, {
        ...file,
        RECHAZADO:'N',
        APROBDEP: "N",
        APROBCRED: "N",
      })
      );
  }else{
 Swal.fire({
  title: '¿Estas seguro de rechazar la SCC ?',
  text: "Los cambios seran alterados!!!",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Guardar',
  denyButtonText: ` No guardar`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    dispatch(
      editarSCC(file.NROSCC, {
        ...file,
        RECHAZADO: 'S',
        APROBDEP: "N",
        APROBCRED: "N",
      })
      );
    Swal.fire('Los cambios se modificaron con exito !', '', 'success')

  } else if (result.isDenied) {
    Swal.fire('Los cambios no se modificaron', '', 'info')
  }
})

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
  //falta agregar  file + la curva de talle en un solo array
  const click = (file) => {
    console.log(file);
    if (file.APROBDEP !== "S") {
      dispatch(abrirModal());
      const curva = buscarNombrePorArt(file.ARTICULO);
      const newFile = { ...file, ...curva };
      dispatch(datoSelec(newFile));
    } else {
      dispatch(
        editarSCC(file.NROSCC, { ...file, APROBDEP: "N", APROBCRED: "N" })
      );
    }
  };
  //spinner
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
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
      render: (state, file) => ( 
      <Checkbox checked={file.APROBCRED === "S"} />
      
      ),
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
