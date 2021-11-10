import {Tag} from 'antd'
export const columnasVacaciones = [
    {
        title: 'N de Vacacion',
        dataIndex: 'id',
        
      },

      {
          title:'Periodo' ,
          dataIndex:'periodo',
      },
      {
        title:'Fecha de Solicitud',
        dataIndex: 'fechaSolicitud' ,
    },
    {
        title: 'Desde  ',
        dataIndex:'fechaDesde',
    },
    {
        title:'Hasta' ,
        dataIndex:'fechaHasta',
    },
    {
        title:'Dias Restantes' ,
        dataIndex:'diasFaltantes',
    },
    {
        title:'Mensaje de Grencia',
        dataIndex:'respMensaje'
    },
    {
        title:'Estado' ,
        dataIndex:'estadoFinal',
        render: (state,file) => (
            file.estadoFinal==='aprobado'?
            <Tag color='green' >{file.estadoFinal}</Tag>
           
            : file.estadoFinal=== 'pendiente'?
            <Tag color='gold'>{file.estadoFinal}</Tag>
            : 
            <Tag color='red'>{file.estadoFinal}</Tag>

          ),
    }
      
]