import React from "react";
import { Table, Input, Button, Space,Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReactExport from "react-export-excel";
import "./botonExcel.css";
const {Title} =Typography

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
export const HelperTABLEobj = ({
  hoja,
  namefile,
  columns,
  data,
  boton,
  x,
  y,
  expandible= false,
  bordered=true,
  check=false,
  setDataCheck,
  title='',
  footer,
  colExcel,

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
  const filtrosinLupa= columns?.filter(l=>l.lupa !== true);
  const filtroconLupa= columns?.filter(l=>l.lupa === true);
  const col = filtroconLupa?.map((d) => {return {...d,...getColumnSearchProps(d.key)};});
  const columna= [...col,...filtrosinLupa]
  
  //sector check
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
       setDataCheck(selectedRows)
    },

  };
  
  
  return (
    <>
      {boton && (
        <ExcelFile
          element={<Button className="btn-excel">Exportar a Excel</Button>}
          filename={namefile}
        >
          <ExcelSheet data={data} name={hoja}>
            {colExcel.map((c) => (
               
              <ExcelColumn label={ c.title} value={c.dataIndex} />
            ))}
          </ExcelSheet>
        </ExcelFile>
      )}

      <Table
      title={()=> <Title level={2}>{title}</Title>}
      rowSelection={check?rowSelection:''}
        columns={columna}
        dataSource={data}
        bordered={bordered}
        expandable={expandible?{
          expandedRowRender: record => <>{record.description}</>,
        }:''}
        footer={() => (footer)}
        pagination={{
          position: ['none', 'bottomLeft'],
        }}
        sortDirections={['descend','ascend' ]}
        size='small'
      />
  
    </>
  );
};