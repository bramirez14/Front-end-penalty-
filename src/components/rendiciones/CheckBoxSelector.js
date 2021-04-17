import React, { useState } from "react";
import { Table, Radio, Divider } from 'antd';
import './css/checkBoxSelector.css'
export const CheckBoxSelector = ({ funcion }) => {
    const [selectionType, setSelectionType] = useState("checkbox");
    const columns = [
        {
          title: "Fecha",
          dataIndex: "fecha",
          
        },
      
        {
          title: "Importe",
          dataIndex: "importe",
        },
        
      ];
      const data = funcion?.map((f, i) => {
        return {
          ...f,
          item: i + 1,
          key: f.id,
          fecha:f.fecha
        };
      });
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`id: ${selectedRowKeys}`, "datos de la fila: ", selectedRows);
        },
      };
  return (
<>
<h6>Anticipos de de gastos pendiente </h6>
    <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
