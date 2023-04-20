import React, { useState } from "react";
import { fecha } from "../../../helpers/funcioneshelpers";
import { useDispatch, useSelector } from "react-redux";
import { abrirModal, datoSelec, editarSCC } from "../../../redux/actions/scc";
import { Checkbox, Button, Table, Input, Space, Spin } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

export const ColumnaSCC = () => {
  const [state, setState] = useState({ searchText: "", searchedColumn: "" });
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
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
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
  const getColumnSearchProps = (dataIndex) => ({
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

    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
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

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  // fin de lupa

  return [
    {
      title: "Dep",
      dataIndex: "Dep",
      render: (state, file) => (
        <>
          {!file.NROCOMP && (
            <Checkbox
              onChange={() => click(file)}
              checked={file.APROBDEP === "S"}
            />
          )}
        </>
      ),
      width: 50,
    },
    {
      title: "Cre",
      dataIndex: "Cre",
      render: (state, file) =>
        !file.NROCOMP && <Checkbox checked={file.APROBCRED === "S"} />,
      width: 50,
    },
    {
      title: "Rec",
      dataIndex: "Rec",
      render: (state, file) => (
        <>
          {!file.NROCOMP && (
            <Checkbox
              onChange={() => onChangeRechazar(file)}
              checked={file.RECHAZADO === "S"}
            />
          )}
        </>
      ),
      width: 50,
    },
    {
      title: "Comprobante",
      dataIndex: "NROCOMP",
      ...getColumnSearchProps("NROCOMP"),
      render: (state, file) => <h5>{file.NROCOMP}</h5>,
      width: 170,
    },
    {
      title: "Fecha",
      dataIndex: "FECEMISION",
      ...getColumnSearchProps("FECEMISION"),
      render: (state, file) => <h5> {fecha(file.FECEMISION)} </h5>,

      width: 150,
    },
    {
      title: "SCC",
      dataIndex: "NROSCC",
      ...getColumnSearchProps("NROSCC"),
      render: (state, file) => <h5>{file.NROSCC}</h5>,
      width: 180,
    },
    {
      title: "Cte",
      dataIndex: "CLIENTE",
      ...getColumnSearchProps("CLIENTE"),
      render: (state, file) => <h5> {file.CLIENTE} </h5>,
      width: 100,
    },
    {
      title: "Razon Soc",
      dataIndex: "RAZONSOC",
      ...getColumnSearchProps("RAZONSOC"),
      render: (state, file) => <h5> {file.RAZONSOC} </h5>,
      width: 200,
    },
    {
      title: "Articulo",
      dataIndex: "ARTICULO",
      render: (state, file) => <h5> {file.ARTICULO} </h5>,
      width: 200,
    },
    {
      title: "Descrip",
      dataIndex: "DESCRIP",
      render: (state, file) => <h5> {file.DESCRIP} </h5>,
      width: 240,
    },
    {
      title: "Precio Lista",
      dataIndex: "PRECIOLIST",
      render: (state, file) => <h5> {file.PRECIOLIST} </h5>,
      width: 200,
    },
    {
      title: "Precio Fact",
      dataIndex: "PRECFACT",
      render: (state, file) => <h5> {file.PRECFACT} </h5>,
      width: 120,
    },
    {
      title: "Fecha Fact",
      dataIndex: "FECFACT",
      render: (state, file) => <h5> {fecha(file.FECFACT)} </h5>,
      width: 200,
    },
    {
      title: "Total",
      dataIndex: "CANTPED",
      render: (state, file) => <h5> {file.CANTPED} </h5>,
      width: 80,
    },

    {
      title: "T1",
      dataIndex: "CANTPEDT00",
      render: (state, file) => <h5> {file.CANTPEDT00} </h5>,
      width: 80,
    },
    {
      title: "T2",
      dataIndex: "CANTPEDT01",
      render: (state, file) => <h5> {file.CANTPEDT01} </h5>,
      width: 80,
    },
    {
      title: "T3",
      dataIndex: "CANTPEDT02",
      render: (state, file) => <h5> {file.CANTPEDT02} </h5>,
      width: 80,
    },
    {
      title: "T4",
      dataIndex: "CANTPEDT03",
      render: (state, file) => <h5> {file.CANTPEDT03} </h5>,
      width: 80,
    },
    {
      title: "T5",
      dataIndex: "CANTPEDT04",
      render: (state, file) => <h5> {file.CANTPEDT04} </h5>,
      width: 80,
    },
    {
      title: "T6",
      dataIndex: "CANTPEDT05",
      render: (state, file) => <h5> {file.CANTPEDT05} </h5>,
      width: 80,
    },
    {
      title: "T7",
      dataIndex: "CANTPEDT06",
      render: (state, file) => <h5> {file.CANTPEDT06} </h5>,
      width: 80,
    },
    {
      title: "T8",
      dataIndex: "CANTPEDT07",
      render: (state, file) => <h5> {file.CANTPEDT07} </h5>,
      width: 80,
    },
    {
      title: "T9",
      dataIndex: "CANTPEDT08",
      render: (state, file) => <h5> {file.CANTPEDT08} </h5>,
      width: 80,
    },
    {
      title: "T10",
      dataIndex: "CANTPEDT09",
      render: (state, file) => <h5> {file.CANTPEDT09} </h5>,
      width: 80,
    },
    {
      title: "T11",
      dataIndex: "CANTPEDT10",
      render: (state, file) => <h5> {file.CANTPEDT10} </h5>,
      width: 80,
    },
    {
      title: "T12",
      dataIndex: "CANTPEDT11",
      render: (state, file) => <h5> {file.CANTPEDT11} </h5>,
      width: 80,
    },
    {
      title: "T13",
      dataIndex: "CANTPEDT12",
      render: (state, file) => <h5> {file.CANTPEDT12} </h5>,
      width: 80,
    },
    {
      title: "T14",
      dataIndex: "CANTPEDT13",
      render: (state, file) => <h5> {file.CANTPEDT13} </h5>,
      width: 80,
    },
    {
      title: "T15",
      dataIndex: "CANTPEDT14",
      render: (state, file) => <h5> {file.CANTPEDT14} </h5>,
      width: 80,
    },
    {
      title: "Precio",
      dataIndex: "PRECIO",
      render: (state, file) => <h5> {file.PRECIO} </h5>,
      width: 80,
    },
  ];
};
