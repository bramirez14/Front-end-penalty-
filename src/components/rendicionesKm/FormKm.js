import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Input, DatePicker, Button, Modal } from "antd";
import { useForm } from "../../hooks/useForm";
import { PeticionGET } from "../../config/PeticionGET";
import { SocketContext } from "../../context/SocketContext";
import Swal from "sweetalert2";
import { axiosURL } from "../../config/axiosURL";
export const FormKm = ({ history, get }) => {
  const { socket } = useContext(SocketContext);
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const [loading, setLoading] = useState(false);
  const [stateKm, setStateKm] = useState([]);
  const [datosKm, setDatosKm] = useState([]);

  const [visible, setVisible] = useState(false);
  const [datePicker, setDatePicker] = useState("");
  const id = localStorage.getItem("uid");
  const datosUsuario = PeticionGET(`/${id}`);
  const [values, handleInputChange, reset] = useForm({
    KmI: "",
    KmF: "",
    usuarioId: id,
    nota: "",
  });

  const { KmI, KmF, nota, fechaSelect } = values;
  const precioKM = PeticionGET("/precio/km");
  console.log(precioKM);
  const restaKm =
    KmI === "" && KmF === "" ? "0 " : parseFloat(KmF) - parseFloat(KmI);
  const totalImporte =
    restaKm === "0" ? "Importe" : restaKm * parseFloat(precioKM[0]?.precio); //debe venir de la db

  const handleSubmit = async (values) => {
   
    if(parseFloat(KmF)< parseFloat(KmI)){
        Swal.fire(
          ' Km final debe ser mayor a  Km inicial',
        )
    reset();
        
      }else{
     setVisible(false);
    await axiosURL.post("/kilometros", {
      ...values,
      fechaSelect: values.fecha._d.toLocaleDateString(),
      KmRecorrido: restaKm,
      usuarioId: id,
      importe: totalImporte,
    });
    get();
    reset();
  };
}
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        style={{ backgroundColor: "#46a461", borderColor: "#46a461" }}
      >
        Ingresar
      </Button>
      <Modal
      style={{ top: 10 }}
        visible={visible}
        title="Kilometros"
        okText="Guardar"
        cancelText="Cancelar"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleSubmit(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          size="large"
          layout="vertical"
          name="form_in_modal"
          onChange={handleInputChange}
          gutter={20}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item name="fecha">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Ingrese una fecha"
                  name="fecha"
                  format={dateFormat}
                />
              </Form.Item>
            

            <Form.Item name="KmI">
              <Input
                type="number"
                name="KmI"
                placeholder="Km Inicial"
                min={0}
              />
            </Form.Item>
            <Form.Item name="KmF">
              <Input type="number" name="KmF" placeholder="Km Final" min={0} />
            </Form.Item>
            <Form.Item>
              <Input value={`${restaKm} Km`} disabled />
            </Form.Item>
            <Form.Item>
              <Input value={` $${totalImporte}`} disabled />
            </Form.Item>
            <Form.Item name="nota">
              <Input.TextArea placeholder="Nota" />
            </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
