import React from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReactExport from "react-export-excel";
import "./botonExcel.css";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
export const HelperTABLEobj = ({
  hoja,
  namefile,
  columns,
  data,
  boton,
  paginas = false,
  x,
  y,
}) => {
  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
    };
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => confirm();
  const handleReset = (clearFilters) => clearFilters();
 
  const col = columns?.map((d) => {
    return { ...d, ...getColumnSearchProps(d.key) };
  });
  return (
    <>
      {boton && (
        <ExcelFile
          element={<Button className="btn-excel">Exportar a Excel</Button>}
          filename={namefile}
        >
          <ExcelSheet data={data} name={hoja}>
            {col.map((c) => (
              <ExcelColumn label={c.title} value={c.dataIndex} />
            ))}
          </ExcelSheet>
        </ExcelFile>
      )}

      <Table
        columns={col}
        dataSource={data}
        pagination={paginas}
        bordered
        scroll={{ y: y}}
        
      />
    </>
  );
};
