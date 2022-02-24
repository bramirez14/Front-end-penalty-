import { useState } from "react";
import { Button } from "antd";
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export const SccExcel = ({ data }) => {
  const excelSCC = [
    {
      key: "1",
      title: "APROBCRED",
      dataIndex: "APROBCRED",
    },
    {
      key: "2",

      title: "APROBDEP",
      dataIndex: "APROBDEP",
    },
    {
      key: "3",

      title: "RECHAZADO",
      dataIndex: "RECHAZADO",
    },
    {
      key: "4",

      title: "Fecha",
      dataIndex: "FECEMISION",
    },
    {
      key: "5",
      title: "SCC",
      dataIndex: "NROSCC",
    },
    {
      key: "6",

      title: "Cte",
      dataIndex: "CLIENTE",
    },
    {
      key: "6",

      title: "Razon Soc",
      dataIndex: "RAZONSOC",
    },
    {
      key: "7",

      title: "Articulo",
      dataIndex: "ARTICULO",
    },
    {
      key: "7",

      title: "Descrip ART",
      dataIndex: "DESCRIP",
    },
    {
      key: "8",

      title: "Precio Lista",
      dataIndex: "PRECIOLIST",
    },
    {
      key: "9",

      title: "Precio Fact",
      dataIndex: "PRECFACT",
    },
    {
      key: "10",

      title: "Fecha Fact",
      dataIndex: "FECFACT",
    },
    {
      key: "11",

      title: "Total",
      dataIndex: "CANTPED",
    },

    {
      key: "12",

      title: "T1",
      dataIndex: "CANTPEDT00",
    },
    {
      key: "13",

      title: "T2",
      dataIndex: "CANTPEDT01",
    },
    {
      key: "14",

      title: "T3",
      dataIndex: "CANTPEDT02",
    },
    {
      key: "15",

      title: "T4",
      dataIndex: "CANTPEDT03",
    },
    {
      key: "16",

      title: "T5",
      dataIndex: "CANTPEDT04",
    },
    {
      key: "17",

      title: "T6",
      dataIndex: "CANTPEDT05",
    },
    {
      key: "18",

      title: "T7",
      dataIndex: "CANTPEDT06",
    },
    {
      key: "19",

      title: "T8",
      dataIndex: "CANTPEDT07",
    },
    {
      key: "20",

      title: "T9",
      dataIndex: "CANTPEDT08",
    },
    {
      key: "21",

      title: "T10",
      dataIndex: "CANTPEDT09",
    },
    {
      key: "22",

      title: "T11",
      dataIndex: "CANTPEDT10",
    },
    {
      key: "23",

      title: "T12",
      dataIndex: "CANTPEDT11",
    },
    {
      key: "24",

      title: "T13",
      dataIndex: "CANTPEDT12",
    },
    {
      key: "25",

      title: "T14",
      dataIndex: "CANTPEDT13",
    },
    {
      key: "26",

      title: "T15",
      dataIndex: "CANTPEDT14",
    },
    {
      key: "27",

      title: "Precio",
      dataIndex: "PRECIO",
    },
    {
      key: "28",

      title: "Comprobante",
      dataIndex: "NROCOMP",
      render:(estado, file) => file.NROCOMP
    },
  ];
 



  function confirmEnviar() {
    let data= document.querySelector('.btn-excel')
    console.log(data);
    data.innerHTML='Cargando...'
    data.disabled= true;
   
    setTimeout(function(){
      data.disabled = false;
      data.innerHTML= "Exportar a Excel";
    }, 7000);
    //return false; 
  }
  

  return (
    <> 

  
       <ExcelFile
          element={
           
            <Button onClick={confirmEnviar} className="btn-excel">Exportar a Excel</Button>
           
          }
          filename="SCC"
        >
          <ExcelSheet data={data} name="SCC">
            {excelSCC.map((c) => (
              <ExcelColumn label={c.title} value={c.dataIndex} />
            ))}
          </ExcelSheet>
        </ExcelFile>
    </>
  );
};
