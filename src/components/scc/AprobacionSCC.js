import React, { useState, useEffect } from "react";
import { Row, Col,Table,Button, Modal, Form, Input, Radio,Checkbox, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { todasLasSCC, todosLosArticulos } from "../../redux/actions/scc";
import { ColumnaSCC } from "./columnas/ColumnaSCC";
import { ModalSCC } from "./ModalSCC";
const { TextArea } = Input;


export const AprobacionSCC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState({
    state:false,
    curva:{}
  })
  const { solicitudControlCalidad } = useSelector((state) => state);
  const todasLasSolicitudes = solicitudControlCalidad.scc;
  useEffect(() => {
    dispatch(todasLasSCC());
    dispatch(todosLosArticulos())
  }, []);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setModal({...modal,state:false});
  };
  const data = todasLasSolicitudes?.[0].map((t) => ({
    ...t,
    key: t.NROSCC,
  }));
  console.log(modal);
  return (
  <>
   <ModalSCC
  visible={modal.state}
  onCreate={onCreate}
  onCancel={() => {
    setModal({...modal,state:false});
  }}/>
      <Table
          size='small'
          bordered
        dataSource={data}
        columns={ColumnaSCC(setModal,modal)}
      />
      </>
  );
};
