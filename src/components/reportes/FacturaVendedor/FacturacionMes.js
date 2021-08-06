import React from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./botonExcel.css";
import { PeticionGETIntranet } from "../../../config/PeticionGET";

export const FacturacionMes = () => {
  const getFacturacionMes= PeticionGETIntranet('/facturacion/mes')
  console.log(getFacturacionMes);
  return(
      <></>
  )
};
