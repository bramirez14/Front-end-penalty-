import React,{useState,useRef} from 'react';
import { Table, Switch, Radio, Form, Space,Button,Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SearchOutlined } from "@ant-design/icons";


const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: <h1>hola mundo</h1>
  });
}

const expandable = { expandedRowRender: record => <p>{record.description}</p> };

export const Demo =()=> {
  const [state2, setState2] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const [state, setState] = useState({
    bordered: false,
    expandable,
    rowSelection: {},
    hasData: true,

  })
  const searchInput = useRef("");
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState2({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
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
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput, 100);
      }
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState2({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState2({ searchText: "" });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps("name"),
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      ...getColumnSearchProps("age"),
     
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ...getColumnSearchProps("apellido"),
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Action',
      key: 'action',
      sorter: true,
      render: () => (
        <Space size="middle">
          <a>Delete</a>
          <a className="ant-dropdown-link">
            More actions <DownOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const handleToggle = prop => enable => {
    setState({ ...state,[prop]: enable });
  };

  const handleExpandChange = enable => {
    setState({ ...state,expandable: enable ? expandable : undefined });
  };


  const handleRowSelectionChange = enable => {
    setState({...state, rowSelection: enable ? {} : undefined });
  };

  const handleYScrollChange = enable => {
    setState({ ...state,yScroll: enable });
  };
  const handleXScrollChange = e => {
    setState({ ...state,xScroll: e.target.value });
  };
 
    const { xScroll, yScroll,  } = state;

    const scroll = {};
    if (yScroll) {
      scroll.y = 240;
    }
    if (xScroll) {
      scroll.x = '100vw';
    }

    const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));
    if (xScroll === 'fixed') {
      tableColumns[0].fixed = true;
      tableColumns[tableColumns.length - 1].fixed = 'right';
    }

    return (
      <>
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
        >
          <Form.Item label="Bordered">
            <Switch checked={state.bordered} onChange={handleToggle('bordered')} />
          </Form.Item>
          <Form.Item label="Expandable">
            <Switch checked={!!state.expandable} onChange={handleExpandChange} />
          </Form.Item>
          <Form.Item label="Checkbox">
            <Switch checked={!!state.rowSelection} onChange={handleRowSelectionChange} />
          </Form.Item>
          <Form.Item label="Fixed Header">
            <Switch checked={!!yScroll} onChange={handleYScrollChange} />
          </Form.Item>
          <Form.Item label="Table Scroll">
            <Radio.Group value={xScroll} onChange={handleXScrollChange}>
              <Radio.Button value={undefined}>Unset</Radio.Button>
              <Radio.Button value="scroll">Scroll</Radio.Button>
              <Radio.Button value="fixed">Fixed Columns</Radio.Button>
            </Radio.Group>
          </Form.Item>
       </Form>
        <Table
          {...state}
          columns={tableColumns}
          dataSource={state.hasData ? data : null}
          scroll={scroll}
        />
      </>
    );
  
}

