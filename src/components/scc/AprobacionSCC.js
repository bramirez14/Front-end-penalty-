import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { todasLasSCC } from "../../redux/actions/scc";
import { columnaSCC } from "./columnas/columnaSCC";

export const AprobacionSCC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();
  const { solicitudControlCalidad } = useSelector((state) => state);
  const todasLasSolicitudes = solicitudControlCalidad.scc;
  useEffect(() => {
    dispatch(todasLasSCC());
  }, []);
  
  const data = todasLasSolicitudes?.[0].map((t) => ({
    ...t,
    key: t.NROSCC,
  }));
  return (
    <div>
      <Table
          size='small'
          bordered
        dataSource={data}
        columns={columnaSCC}
      />
    </div>
  );
};
