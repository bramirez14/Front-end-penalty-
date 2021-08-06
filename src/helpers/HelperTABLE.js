import React from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./botonExcel.css";

export const HelperTABLE = ({ hoja, namefile,columns,data,boton,paginas=false}) => {
  
  
  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({setSelectedKeys,selectedKeys,confirm,clearFilters,}) => (
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
  const handleReset = (clearFilters) =>  clearFilters();
  const col = columns?.map((d) => {return {...d,...getColumnSearchProps(d.key)};});
  return (
    <>
    {boton &&
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="btn-excel"
        table="ant-table-wrapper"
        filename={namefile}
        sheet={hoja}
        buttonText="Exportar a Excel"
      />}
      <table
        id="ant-table-wrapper"
        style={{ width: "100%", marginTop: "10px" }}
      >
        <Table columns={col} dataSource={data} pagination={paginas} />
      </table>
    </>
  );
};
