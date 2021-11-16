import React from 'react'
import { Checkbox } from "antd";
import { fecha } from '../../../helpers/funcioneshelpers';

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  
    
export const columnaSCC = [
  {
    title: "Dep",
    dataIndex: "Dep",
    key:'1',
    render: (state, file) => <Checkbox onChange={onChange} />,// desp tengo q verificar si  la uno dep con cre 
  },
  {
    title: "Cre",
    dataIndex: "Dep",
    key:'1',
    render: (state, file) => <Checkbox onChange={onChange} checked={true} />,
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
    render: (state, file) =>  <p> {fecha(file.FECFACT)} </p> ,

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
    title: "Precio",
    dataIndex: "PRECIO",
  },
];
