import React, {useState} from "react";
import { fecha } from "../../../helpers/funcioneshelpers";
import { useDispatch, useSelector } from "react-redux";
import{ abrirModal,datoSelec} from '../../../redux/actions/scc'
import {
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Checkbox,
} from "antd";

export const ColumnaSCC = (setState) => {
  const dispatch = useDispatch();
  const { articulos, listaTalles } = useSelector((state) => state);
  function onChange(e) {
    //setState({...state,state:e.target.checked});
   // dispatch(abrirCerrarModal(e.target.checked))
  }
 const buscarNombrePorArt=(art)=>{
  const buscarNomArt= articulos.art?.find(t=> t.NUMERO === art  )
  const numTalle= buscarNomArt?.CODTALLE
  const curvaTalles= listaTalles?.talle?.find(l=> l.TRANSPORTISTA === numTalle)
  return curvaTalles
}
//falta agregar  file + la curva de talle en un solo array 
const click=(file)=>{
  dispatch(abrirModal())
  const curva= buscarNombrePorArt(file.ARTICULO);
  const newFile = {...file,...curva}
  dispatch(datoSelec(newFile));
  
}
  return [ 
    {
      title: "Dep",
      dataIndex: "Dep",
      render: (state, file) => {
        // console.log(file);

        return (
          <>
          
            <Button type='link' onClick={()=>click(file)} ><Checkbox onChange={onChange} /></Button>
          </>
        );
      }, 
    },
    {
      title: "Cre",
      dataIndex: "Cre",
      render: (state, file) => <Checkbox onChange={onChange} />,
    },
    {
      title: "Rec",
      dataIndex: "Rec",
      render: (state, file) => <Checkbox onChange={onChange} />,
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
      title:'Descrip',
      dataIndex:'Descrip'
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
