import React, { useState } from "react";
import { fecha } from "../../../helpers/funcioneshelpers";
import { useDispatch, useSelector } from "react-redux";
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

export const ColumnaSCC = (setState,state) => {
  function onChange(e) {
    setState({...state,state:e.target.checked});
    
  }
const click=(file)=>{
setState({...state,curva:file})
}


  return [
    {
      title: "Dep",
      dataIndex: "Dep",
      key: "1",
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
      key: "1",
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
      dataIndex: "CANTPEDT01",
    },
    {
      title: "T2",
      dataIndex: "CANTPEDT02",
    },
    {
      title: "T3",
      dataIndex: "CANTPEDT03",
    },
    {
      title: "T4",
      dataIndex: "CANTPEDT04",
    },
    {
      title: "T5",
      dataIndex: "CANTPEDT05",
    },
    {
      title: "T6",
      dataIndex: "CANTPEDT06",
    },
    {
      title: "T7",
      dataIndex: "CANTPEDT07",
    },
    {
      title: "T8",
      dataIndex: "CANTPEDT08",
    },
    {
      title: "T9",
      dataIndex: "CANTPEDT09",
    },
    {
      title: "T10",
      dataIndex: "CANTPEDT10",
    },
    {
      title: "T11",
      dataIndex: "CANTPEDT11",
    },
    {
      title: "T12",
      dataIndex: "CANTPEDT12",
    },
    {
      title: "T13",
      dataIndex: "CANTPEDT13",
    },
    {
      title: "T14",
      dataIndex: "CANTPEDT14",
    },
    {
      title: "T15",
      dataIndex: "CANTPEDT15",
    },
    {
      title: "Precio",
      dataIndex: "PRECIO",
    },
  ];
};
