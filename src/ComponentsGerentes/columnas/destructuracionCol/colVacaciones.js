import { PeticionGET } from "../../../config/PeticionGET";

export const colVacaciones=[
    {
        title: "N° de solicitud",
        dataIndex: "id",
        key: "id",
        width:100,
        render: (state, file) => <h5>{file.id}</h5>
      },
  
        {
          title: "Nombre",
          dataIndex: "nombre",
          key: "nombre",
        width:100,
        render: (state, file) => <h5>{file.nombre}</h5>


        },
        {
          title: "Apellido",
          dataIndex: "apellido",
          key: "apellido",
        width:100,
        render: (state, file) => <h5>{file.apellido}</h5>


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
            return( <h5 style={{marginLeft:'10px'}}>{DtoSelect}</h5>)
    
          },
        },
      {
        title: 'Periodo',
        dataIndex: 'periodo',
        key: 'periodo',
        width:100,
        render: (state, file) => <h5>{file.periodo}</h5>

        
        
      },
      {
        title: 'Fecha de Solicitud',
        dataIndex: 'fechaSolicitud',
        key: 'fechaSolicitud',
        width:170,
        render: (state, file) => <h5>{file.fechaSolicitud}</h5>
        
      },
      {
          title: 'Fecha Desde',
          dataIndex: 'fechaDesde',
          key: 'fechaDesde',
          width:170,
          render: (state, file) => <h5>{file.fechaDesde}</h5>

        },
        {
          title: 'Fecha Hasta',
          dataIndex: 'fechaHasta',
          key: 'fechaHasta',
          width:170,
          render: (state, file) => <h5>{file.fechaHasta}</h5>

        },
        {
          title: 'Mensaje',
          dataIndex: 'obs',
          key: 'obs',
          width: 100,
          lupa:false,
        render: (state, file) => <h5>{file.obs}</h5>

        },
        {
          title: 'Faltantes',
          dataIndex: 'diasFaltantes',
          key: 'diasFaltantes',
          width: 100,
          lupa: false,
        render: (state, file) => <h5>{file.diasFaltantes}</h5>

        },
      {
          title: "Estado",
          dataIndex: "estado",
          key: "estado",
        width:120,

          lupa: false,
          render: (estado,file) =>{
            
            const color =()=>{
              switch (file.estado) {
                case 'pendiente':
                  return(<h5 style={{color:'#F79E0B' }}> pendiente...</h5> )
                  case 'aprobado':
               return (<h5 style={{color:'green'}}> aprobado </h5>)
                default: 
                return(<h5 style={{color:'red'}}> rechazado </h5>)
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