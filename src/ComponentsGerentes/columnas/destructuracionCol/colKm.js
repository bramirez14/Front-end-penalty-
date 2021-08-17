import {
    Image
  } from "antd";
import { PeticionGET } from "../../../config/PeticionGET";
var numberFormat = new Intl.NumberFormat("es-ES");
export const colKm=[
    {
        title: "N° de anticipo",
        dataIndex: "id",
        key: "id",
        width: 100,
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
        width: 100,

      },
      {
        title: "Apellido",
        dataIndex: "apellido",
        key: "apellido",
        width: 100,

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
          return <span style={{ marginLeft: "10px" }}>{DtoSelect}</span>;
        },
      },
      {
        title: "Km Total",
        dataIndex: "kmTotal",
        key: "kmTotal",
        width: 140,
        lupa: false,

        render: (state, file) => <span>{file.kmTotal} Km</span>,
      },
  
      {
        title: "Importe Total",
        dataIndex: "importeTotal",
        key: "importeTotal",
        width: 170,

        render:(state,file)=><span > ${numberFormat.format(file.importeTotal)}</span>,
        
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
        title: "Estado",
        dataIndex: "estado",
        key: "estado",
        width: 100,
        lupa: false,
        render: (estado, file) => {
          const color = () => {
            switch (file.estado) {
              case "pendiente":
                return <span style={{ color: "yellow" }}> pendiente...</span>;
              case "aprobado":
                return <span style={{ color: "green" }}> aprobado </span>;
              default:
                return <span style={{ color: "red" }}> rechazado </span>;
            }
          };
          return <>{color()}</>;
        },
      },
  
]