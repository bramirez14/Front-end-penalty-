import React, { useState, useEffect } from "react";
import { Row, Col,Table,Button, Modal, Form, Input, Radio,Checkbox, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { todasLasSCC, todosLosArticulos, todasLasTalles, abrirCerrarModal } from "../../redux/actions/scc";
import { ColumnaSCC } from "./columnas/ColumnaSCC";
import { ModalSCC } from "./ModalSCC";
const { TextArea } = Input;


export const AprobacionSCC = () => {
  const dispatch = useDispatch();
  const { solicitudControlCalidad,articulos } = useSelector((state) => state);
  const todasLasSolicitudes = solicitudControlCalidad.scc;
  const modal= solicitudControlCalidad.abrirModal
  const todosLosArt = articulos.art;
  useEffect(() => {
    dispatch(todasLasSCC());
    dispatch(todosLosArticulos())
    dispatch(todasLasTalles())
  }, []);
  const buscarNombrePorArt=(art)=>{
     const buscarNomArt= todosLosArt?.find(t=> t.NUMERO === art  )
     return buscarNomArt?.DESCRIP
  }
  const onCreate = (values) => {
    dispatch(abrirCerrarModal(false));
  };
  const data = todasLasSolicitudes?.map((t) => ({
    ...t,
    Descrip:buscarNombrePorArt(t.ARTICULO),
    key: t.NROSCC,

  }));
  return (
  <>
   <ModalSCC
  visible={modal}
  onCreate={onCreate}
  onCancel={() => {
    dispatch(abrirCerrarModal(false));
  }}/>
      <Table
          size='small'
          bordered
        dataSource={data}
        columns={ColumnaSCC()}
      />
      </>
  );
};
