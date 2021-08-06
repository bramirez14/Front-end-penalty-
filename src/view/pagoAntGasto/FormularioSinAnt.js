import React from "react";
import { Form, Input } from "antd";
import { Archivo } from "../../file/Archivo";
export const FormularioSinAnt = ({
  importeRendido,
  orden,
  stateFile,
  setStateFile,
}) => {
  const handleFileChange = (e) => {
    setStateFile(e.target.files[0]);
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Numero de Orden">
        <Input value={"#" + orden} disabled />
      </Form.Item>

      <Form.Item label="Importe a Pagar">
        <Input value={"$" + importeRendido} disabled />
      </Form.Item>

      <Form.Item>
        <Archivo change={handleFileChange} />
      </Form.Item>
      <Form.Item label={stateFile.name} />
    </Form>
  );
};
