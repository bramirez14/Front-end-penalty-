import {Tag} from 'antd'
import { numeroConComa } from '../../../helpers/funcioneshelpers'

export const columnasAnticipos=[
    {
        title: 'N de Ant',
        dataIndex: 'id',
        
      },
        {
                title: 'fecha de Solicitud  ',
                dataIndex:'fecha',
            },
      {
          title:'Sueldo o Aguinaldo' ,
          dataIndex:'sueldo',
      },
      {
        title:'Cuotas',
        dataIndex: 'cuotas' ,
    },
    {
        title:'Forma de pago',
        dataIndex: 'formapagoId',
        render: (state,file) =>{
            switch (file.formapagoId) {
                case 1:
                    return <p>Efectivo</p>  
                case 2: 
                    return <p>Tarjeta de Credito</p> 
                case 3: 
                        return <p>Tarjeta de Debito</p> 
                default:
                    return <p>Tarjeta Recargable</p>
            } 
            }
    },
  {
      title:'Importe',
      dataIndex:'importe',
      render: (state,file) => <p>${numeroConComa(file.importe)}</p>
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