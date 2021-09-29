import React,{ useState,useEffect } from 'react'
import { Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

export const SwitchCompent = ({listo,nolisto}) => {
    const N = localStorage.getItem('N')
    const [state, setState] = useState({
        estado:true,
        estadoFinal:true,
        
      })
      function onChange(checked) {
        setState({...state,estado:checked});
      }
     
      const filtroSeleccion=(data)=> {
        const rev= data?.reverse()
       
        if(state.estado===true){
          return rev?.filter(r=> r.estado===nolisto);
        }else{
          return rev?.filter(r=> r.estado===listo);
          
        }
      }
 
      useEffect(() => filtroSeleccion(),[state])
    return (
        <>
        <Switch checkedChildren="Pendentes" unCheckedChildren={<CheckOutlined />} defaultChecked onChange={onChange} style={{marginRight:10}}/>
        </>
    )
}
