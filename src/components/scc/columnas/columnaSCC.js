import React, { useState } from "react";
import { fecha } from "../../../helpers/funcioneshelpers";
import { useDispatch, useSelector } from "react-redux";
import { abrirModal, datoSelec, editarSCC } from "../../../redux/actions/scc";
import { Checkbox, Button, Table, Input, Space, Spin} from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from "sweetalert2";

export const ColumnaSCC = () => {
  const [state, setState] = useState( 
    {searchText: '',
    searchedColumn: '',
  });
  const dispatch = useDispatch();
  const { solicitudControlCalidad, articulos, listaTalles } = useSelector(
    (state) => state
  );

  function onChangeRechazar(file) {
    if (file.RECHAZADO === "S") {
      dispatch(
        editarSCC(file.NROSCC, {
          ...file,
          RECHAZADO: "N",
          APROBDEP: "N",
          APROBCRED: "N",
        })
      );
    } else {
      Swal.fire({
        title: "Estas seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        
        confirmButtonText: "Si!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            editarSCC(file.NROSCC, {
              ...file,
              RECHAZADO: "S",
              APROBDEP: "N",
              APROBCRED: "N",
            })
          );
          Swal.fire("Eliminado!", "Los datos fueron eliminados.", "success");
        }
      });
    }
  }
  const buscarNombrePorArt = (art) => {
    const buscarNomArt = articulos.art?.find((t) => t.NUMERO === art);
    const numTalle = buscarNomArt?.CODTALLE;
    const curvaTalles = listaTalles?.talle?.find(
      (l) => l.TRANSPORTISTA === numTalle
    );
    return curvaTalles;
  };

  const click = (file) => {
    if (file.APROBDEP !== "S") {
      dispatch(abrirModal());
      const curva = buscarNombrePorArt(file.ARTICULO);
      const newFile = { ...file, ...curva };
      dispatch(datoSelec(newFile));
    } else {
      Swal.fire({
        title: "Estas seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            editarSCC(file.NROSCC, { ...file, APROBDEP: "N", APROBCRED: "N" })
          );
          Swal.fire("Eliminado!", "Los datos fueron eliminados.", "success");
        }
      });
    }
  };

// lupa para los campos de la col 
const getColumnSearchProps = dataIndex => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
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

  render: text =>
    state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[state.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
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


// fin de lupa 



  return [
    {
      title: "Dep",
      dataIndex: "Dep",
      render: (state, file) => (
        <>
          <Checkbox
            onChange={() => click(file)}
            checked={file.APROBDEP === "S"}
          />
        </>
      ),
    },
    {
      title: "Cre",
      dataIndex: "Cre",
      render: (state, file) => <Checkbox checked={file.APROBCRED === "S"} />,
    },
    {
      title: "Rec",
      dataIndex: "Rec",
      render: (state, file) => (
        <Checkbox
          onChange={() => onChangeRechazar(file)}
          checked={file.RECHAZADO === "S"}
        />
      ),
    },

    {
      title: "Fecha",
      dataIndex: "FECEMISION",
      ...getColumnSearchProps('FECEMISION'),
      render: (state, file) => <p> {fecha(file.FECEMISION)} </p>,
      
    },
    {
      title: "SCC",
      dataIndex: "NROSCC",
    },
    {
      title: "Cte",
      dataIndex: "CLIENTE",
      ...getColumnSearchProps('CLIENTE'),

    },
    {
      title: "Articulo",
      dataIndex: "ARTICULO",
    },
    {
      title: "Descrip",
      dataIndex: "Descrip",
    },
    {
      title: "Precio Lista",
      dataIndex: "PRECIOLIST",
    },
    {
      title: "Precio Fact",
      dataIndex: "PRECFACT",
    },
    {
      title: "Fecha Fact",
      dataIndex: "FECFACT",
      render: (state, file) => <p> {fecha(file.FECFACT)} </p>,
    },
    {
      title: "Total",
      dataIndex: "CANTPED",
    },

    {
      title: "T1",
      dataIndex: "CANTPEDT00",
    },
    {
      title: "T2",
      dataIndex: "CANTPEDT01",
    },
    {
      title: "T3",
      dataIndex: "CANTPEDT02",
    },
    {
      title: "T4",
      dataIndex: "CANTPEDT03",
    },
    {
      title: "T5",
      dataIndex: "CANTPEDT04",
    },
    {
      title: "T6",
      dataIndex: "CANTPEDT05",
    },
    {
      title: "T7",
      dataIndex: "CANTPEDT06",
    },
    {
      title: "T8",
      dataIndex: "CANTPEDT07",
    },
    {
      title: "T9",
      dataIndex: "CANTPEDT08",
    },
    {
      title: "T10",
      dataIndex: "CANTPEDT09",
    },
    {
      title: "T11",
      dataIndex: "CANTPEDT10",
    },
    {
      title: "T12",
      dataIndex: "CANTPEDT11",
    },
    {
      title: "T13",
      dataIndex: "CANTPEDT12",
    },
    {
      title: "T14",
      dataIndex: "CANTPEDT13",
    },
    {
      title: "T15",
      dataIndex: "CANTPEDT14",
    },
    {
      title: "Precio",
      dataIndex: "PRECIO",
    },
  ];
};
