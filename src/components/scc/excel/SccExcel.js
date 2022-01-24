import {useState} from'react';
import { Button } from "antd";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const SccExcel = ({data}) => {
    const [click, setClick] = useState(false);
  const excelSCC = [
    {
      title: "Fecha",
      dataIndex: "FECEMISION",
    },
    {
      title: "SCC",
      dataIndex: "NROSCC",
    },
    {
      title: "Cte",
      dataIndex: "CLIENTE",
    },
    {
      title: "Articulo",
      dataIndex: "ARTICULO",
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
  const handleClick=()=>{
    setClick(true)
      setTimeout(() => {
      setClick(false)
    }, 15000)
  }
  console.log(click);
  return <>{
      click? <p>....Espera</p>:
      <ExcelFile
  element={<Button onClick={ handleClick } className="btn-excel">Exportar a Excel</Button>}
  filename='SCC'
>
  <ExcelSheet data={data} name='Aprobacion de SCC'>
    {excelSCC.map((c) => (
       
      <ExcelColumn label={ c.title} value={c.dataIndex} />
    ))}
  </ExcelSheet>
</ExcelFile>}
</>;
};
