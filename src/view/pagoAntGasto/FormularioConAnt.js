import React from "react";
import { Form, Input } from "antd";
import { Archivo } from "../../file/Archivo";

export const FormularioConAnt = ({
  importeRendido,
  importe,
  orden,
  stateFile,
  setStateFile,
  stateFilefinal,
  setStateFilefinal,

}) => {
  const handleFileChange = (e) => {
    setStateFile(e.target.files[0]);
  };

  const handleFileChangefinal = (e) => {
    setStateFilefinal(e.target.files[0]);
  };

  const total = importe - importeRendido;

  return (
    <Form layout="vertical">
      <Form.Item label="Numero de Orden">
        <Input value={"#" + orden} disabled />
      </Form.Item>
      <Form.Item label="Importe Solicitado">
        <Input value={"$" + importe} disabled />
      </Form.Item>
      <Form.Item label="Importe Rendido">
        <Input value={"$" + importeRendido} disabled />
      </Form.Item>
      <Form.Item label="Total">
        <Input value={"$" + total} disabled />
      </Form.Item>
      <Form.Item>
        <Archivo boton='PDF Pago' change={handleFileChange} />
      </Form.Item>
      <p>{stateFile.name}</p>
      <Form.Item>
        <Archivo change={handleFileChangefinal} boton='PDF Orden de pago final' />
      </Form.Item>
      <p> {stateFilefinal.name}</p>
    </Form>
  );
};
