import { Button } from 'antd';
import { axiosURL } from '../../config/axiosURL';

 export const TablaKm = (callBack) => {

    return [
        {
          title: 'Fecha',
          dataIndex: 'fechaSelect',
          width:100,
          render:(state,file) => <h5>{file.fechaSelect} Km</h5>
        },
        {
          title: 'KM INICIAL',
          dataIndex: 'KmI',
          width:100,

          render:(state,file) => <h5>{file.KmI} Km</h5>

        },
        {
          title: 'KM FINAL',
          dataIndex: 'kmF',
          width:100,

          render:(state,file) => <h5>{file.KmF} Km</h5>
        },
        {
          title: 'KM RECORRIDOS',
          dataIndex: 'kmRecorridos',
          width:100,

          render:(state,file) => <h5 style={{marginLeft:'20px'}}>{file.KmRecorrido} Km</h5>
        },
        {
          title: 'TOTAL',
          dataIndex: 'importe',
          width:100,

          render:(state,file) => <h5>${file.importe}</h5>
        },
        {
          title: 'NOTAS',
          dataIndex: 'nota',
          width:100,

          render:(state,file) => <h5>{file.nota}</h5>
        },
        {
          title: '',
          dataIndex: 'acciones',
          width:100,

          render:(state,file) =>{
            const borrar = async (id) => {
              await axiosURL.delete(`/borrar/rendicionKm/${id}`);
              callBack();
          }
            return( <Button onClick={()=>borrar(file.id)}>Borrar</Button>)}
        }
    ]
 
}


   
      /* const data= datos.map(m=> {
        return{
        ...m,
        key: m.id,
       
      }
    }) */
  /*   return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y:long}}
      />
    ) */
