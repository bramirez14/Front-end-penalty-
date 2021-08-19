import React from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";


export const HelperTABLE = ({ columns,data,paginas=false,bordered=false,expandible=false,y}) => {
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
  const filtrosinLupa= columns?.filter(l=>l.lupa===false);
  const filtroconLupa= columns?.filter(l=>l.lupa!==false);
  const col = filtroconLupa?.map((d) => {return {...d,...getColumnSearchProps(d.key)};});
  const columna= [...col,...filtrosinLupa]
  console.log(columna);
  return <Table
   columns={columna} 
   dataSource={data}
    pagination={paginas}
     bordered={bordered}
     expandable={expandible?{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
    }:''}
    scroll={{ y: y}}
  
  />
};
