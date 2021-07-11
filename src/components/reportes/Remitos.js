import React,{useState,useRef} from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { PeticionGETIntranet } from '../../config/PeticionGET';
import { axiosURLIntranet } from '../../config/axiosURL';
import { saveAs } from "file-saver";
export const Remitos = ()=> {
    const todosRemitos = PeticionGETIntranet('/remitos')
    console.log(todosRemitos);
    const [state, setState] = useState( {
        searchText: '',
        searchedColumn: '',
      })
      const searchInput = useRef("");

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput, 100);
      }
    },
 /*    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ), */
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };
  
    const columns = [
        {
            title: 'N° de Cliente',
            dataIndex: 'cliente',
            key: 'cliente',
            ...getColumnSearchProps('cliente'),
          },
      {
        title: 'Nombre y Apellido',
        dataIndex: 'apeynom',
        key: 'apeynom',
        width: '30%',
        ...getColumnSearchProps('apeynom'),
      },
      {
        title: 'N° de vendedor',
        dataIndex: 'vendedor',
        key: 'vendedor',
        width: '30%',
        ...getColumnSearchProps('vendedor'),
      },
      {
        title: 'N° de Pedido',
        dataIndex: 'PEDIDO',
        key: 'PEDIDO',
        width: '30%',
        ...getColumnSearchProps('PEDIDO'),
      },
      {
        title: 'Unidades',
        dataIndex: 'UNIDADES',
        key: 'UNIDADES',
        ...getColumnSearchProps('UNIDADES'),
      },
      {
        title: 'Fecha de Emision',
        dataIndex: 'fecemision',
        key: 'fecemision',
        width: '200px',
        ...getColumnSearchProps('fecemision'),
        render: (estado, file) => {
            let reducir=file.fecemision.split('T');
            return( <p>{reducir[0]}</p>)
        }
      },
      {
        title: 'N° de Remito',
        dataIndex: 'REMITO',
        key: 'REMITO',
        width: '30%',
        ...getColumnSearchProps('REMITO'),

      },
      {
        title: 'Razon Social',
        dataIndex: 'razonsoc',
        key: 'razonsoc',
        width: '200px',
        ...getColumnSearchProps('razonsoc'),

      },
      {
        title: 'Estado',
        dataIndex: 'ESTADO',
        key: 'ESTADO',
        width: '30%',
        ...getColumnSearchProps('ESTADO'),
        render: (estado, file) => {
            const color = () => {
              switch (file.ESTADO) {
                case "PENDIENTE":
                  return <p style={{ color: "#F3D726" }}> <b>PENDIENTE...</b> </p>;
                case "DESPACHADO":
                  return <p style={{ color: "green" }}> DESPACHADO </p>;
                default:
                  return <p style={{ color: "red" }}> EN PREPARACION </p>;
              }
            };
            return <>{color()}</>;
          },

      },
      {
        title: 'PDF',
        dataIndex: 'pdf',
        key: 'pdf',
        ...getColumnSearchProps('pdf'),
        render:(a,file)=>{
          const descargarPDF= async ( pdf)=>{
            console.log(pdf);
            let res=await axiosURLIntranet.get('/remitos/pdf',{
              headers: {archivo:pdf},
              responseType: "blob"
            });
            console.log(res);
            const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
            saveAs(pdfBlob, `${file.pdf}`);
          }
          return(<Button onClick={()=>descargarPDF(file.pdf)}>pdf</Button>)
          }
      },

      
    ];
    return <Table columns={columns} dataSource={todosRemitos} />;
  
}
