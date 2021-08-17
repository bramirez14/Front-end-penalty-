import { PeticionGET } from "../../../config/PeticionGET";

export const colVacaciones=[
    {
        title: "N° de solicitud",
        dataIndex: "id",
        key: "id",
        width:100,
      },
  
        {
          title: "Nombre",
          dataIndex: "nombre",
          key: "nombre",
        width:100,

        },
        {
          title: "Apellido",
          dataIndex: "apellido",
          key: "apellido",
        width:100,

        },
        {
          title: "Dto",
          dataIndex: "departamento",
          key: "departamento",
        width:100,

          render:  (estado, file) => {
            const dtos= PeticionGET("/departamentos");
            const Dto = dtos.find(d=> d.id===file.usuario?.departamentoId)
            const DtoSelect= Dto?.departamento
            return( <span style={{marginLeft:'10px'}}>{DtoSelect}</span>)
    
          },
        },
      {
        title: 'Periodo',
        dataIndex: 'periodo',
        key: 'periodo',
        width:100,
        
      },
      {
        title: 'Fecha de Solicitud',
        dataIndex: 'fechaSolicitud',
        key: 'fechaSolicitud',
        width:170,
        
      },
      {
          title: 'Fecha Desde',
          dataIndex: 'fechaDesde',
          key: 'fechaDesde',
          width:170,

        },
        {
          title: 'Fecha Hasta',
          dataIndex: 'fechaHasta',
          key: 'fechaHasta',
          width:170,

        },
        {
          title: 'Mensaje',
          dataIndex: 'obs',
          key: 'obs',
          width: 100,
          lupa:false,
        },
        {
          title: 'Faltantes',
          dataIndex: 'diasFaltantes',
          key: 'diasFaltantes',
          width: 100,
          lupa: false,
        },
      {
          title: "Estado",
          dataIndex: "estado",
          key: "estado",
        width:100,

          lupa: false,
          render: (estado,file) =>{
            
            const color =()=>{
              switch (file.estado) {
                case 'pendiente':
                  return(<span style={{color:'yellow'}}> pendiente...</span> )
                  case 'aprobado':
               return (<span style={{color:'green'}}> aprobado </span>)
                default: 
                return(<span style={{color:'red'}}> rechazado </span>)
              }}
           return(
             <>
             {
               color()
             }
             </>
           )
          }
    
        },
]