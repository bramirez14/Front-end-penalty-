import {
  Button,
    Image
  } from "antd";
import { BiDownload } from "react-icons/bi";
import { PeticionGET } from "../../../config/PeticionGET";
import { descargarPDF } from "../../helpers/funciones";
var numberFormat = new Intl.NumberFormat("es-ES");
export const colKm=[
    {
        title: "N° de anticipo",
        dataIndex: "id",
        key: "id",
        width: 100,
        render: (state, file) => <h5>{file.id}</h5>

      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
        width: 100,
        render: (state, file) => <h5>{file.nombre}</h5>
      },
      {
        title: "Apellido",
        dataIndex: "apellido",
        key: "apellido",
        width: 100,
        render: (state, file) => <h5>{file.apellido}</h5>
      },
      {
        title: "Departamento",
        dataIndex: "departamento",
        key: "departamento",
        width: 170,
        render: (estado, file) => {
            const dtos = PeticionGET("/departamentos")
          const Dto = dtos.find((d) => d.id === file.usuario?.departamentoId);
          const DtoSelect = Dto?.departamento;
          return <h5 style={{ marginLeft: "10px" }}>{DtoSelect}</h5>;
        },
      },
      {
        title: "Km Total",
        dataIndex: "kmTotal",
        key: "kmTotal",
        width: 140,
        lupa: false,
        render: (state, file) => <h5>{file.kmTotal} Km</h5>,
      },
  
      {
        title: "Importe Total",
        dataIndex: "importeTotal",
        key: "importeTotal",
        width: 170,
        render:(state,file)=><h5 > ${numberFormat.format(file.importeTotal)}</h5>,
        
      },
    
      {
        title: "Imagen",
        dataIndex: "imagen",
        key: "imagen",
        width: 100,
        lupa:false,
        render:(state,file)=>{
          return (
              <Image.PreviewGroup>
                <Image
                  width={100}
                  height={80}
                  src={file.imagen}
                />
              </Image.PreviewGroup>
            );
        }
      },
      {
        title: "PDF proveedores",
        dataIndex: 'pdf',
        key: "pdf",
        width: 140,
        lupa: false,
        render: (state, file) => (
          <>
          {
            file.pdf === null? <h5>No hay pdf!!!</h5>:
            <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(file.pdf)}>
                <BiDownload/>
                </Button>
          }
        </>
      )
      },
      {
        title: "PDF pagos",
        dataIndex: 'pdfinal',
        key: "pdfinal",
        width: 140,
        lupa: false,
        render: (state, file) => (
          <>
          {
            file.pdf === null? <h5>No hay pdf!!!</h5>:
            <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(file.pdfinal)}>
                <BiDownload/>
                </Button>
          }
        </>
      )
      },
      {
        title: "PDF orden de pago final",
        dataIndex: 'pdfpagoFinal',
        key: "pdfpagoFinal",
        width: 140,
        lupa: false,
        render: (state, file) => (
          <>
          {
            file.pdf === null? <h5>No hay pdf!!!</h5>:
            <Button type="link" style={{border:'none',backgroundColor:'transparent'}} onClick={() => descargarPDF(file.pdfpagoFinal)}>
                <BiDownload/>
                </Button>
          }
        </>
      )
      },
     
  
      {
        title: "Estado",
        dataIndex: "estado",
        key: "estado",
        width: 120,
        lupa: false,
        render: (estado, file) => {
          const color = () => {
            switch (file.estado) {
              case "pendiente":
                return <h5 style={{ color: '#F79E0B'  }}> pendiente...</h5>;
              case "aprobado":
                return <h5 style={{ color: "green" }}> aprobado </h5>;
              default:
                return <h5 style={{ color: "red" }}> rechazado </h5>;
            }
          };
          return <>{color()}</>;
        },
      },
  
]