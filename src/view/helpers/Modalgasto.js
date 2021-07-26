import React,{useState} from 'react'
import { Modal, Button } from 'antd';
import { FormularioConAnt } from './FormularioConAnt';
import { axiosURL } from '../../config/axiosURL';
import { FormularioSinAnt } from './FormularioSinAnt';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { FormularioConAnt1 } from './FormularioConAnt1';
    export const Modalgasto = ({boton,title,importeRendido,importe,id,orden,file,stateFile,setStateFile,get,sinocon,listo,pagoRealizado}) => {
    const [state, setState] = useState({
        loading: false,
        visible: false,
      })
      /**Sector Modal */
      const showModal = () => {
        setState({
          visible: true,
        });
      };
    
     const handleOk = () => {
        setState({ loading: true });
        setTimeout(() => {
          setState({ loading: false, visible: false });
        }, 3000);
      };
    
      const handleCancel = () => {
        setState({ visible: false });
      };
      
      
  
      const finalizar= async (id)=>{
      console.log(id);
        if(stateFile.file===''){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un archivo pdf!',
            
          })
        }
        const obj={
          pagoRealizado:'Si'
        }
        const f= new FormData();
        f.append('file',stateFile.file);
        f.append('pagoRealizado',obj.pagoRealizado)
        await axiosURL.put(`/pago/gasto/${id}`,f);
        setStateFile({file:''})
        setState({
          visible: false,
        });
        get()
      }
       const enCurso= async (id)=>{
        
          await axiosURL.put(`/pago/encurso/${id}`,{pagoRealizado:'En curso'});
setState({
  visible: false,
});
          get()
        }

 
/**Fin secto modal */
console.log(listo);
const { visible, loading } = state;
    return (
        <>
        <Button  onClick={showModal} style={{background:'#46a461',border:'none',boxShadow:'none',color:'#ffff'}}>
       {boton}
      </Button>
      <Modal
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" danger onClick={handleCancel}>
            Salir
          </Button>,
          <>
          {/**funcion doble asi dividimos anticipo  */}
          {sinocon==='sin'|| pagoRealizado==='En curso' ?
          <Button key="submit"  loading={loading} onClick={handleOk} 
          style={{background:'#46a461',border:'none',boxShadow:'none',color:'#ffff'}}
          onClick={()=>finalizar(id)}>
            Finalizar
          </Button>:
          <Button key="submit"  loading={loading} onClick={handleOk} 
          style={{background:'#46a461',border:'none',boxShadow:'none',color:'#ffff'}}
          onClick={()=>enCurso(id)}>
            Finalizar
          </Button>
          
          }
          </>,
            
            
        ]}
      >
        {
        sinocon==='sin'?
        <FormularioSinAnt importeRendido={importeRendido} importe={importe} orden={orden} id={id} file={file}
        stateFile={stateFile}
        setStateFile={setStateFile} />: listo==='Si'?
        <FormularioConAnt importeRendido={importeRendido} importe={importe} orden={orden} id={id} file={file}
       stateFile={stateFile}
       setStateFile={setStateFile}
  />:
        <FormularioConAnt1 importeRendido={importeRendido} importe={importe} orden={orden} id={id} file={file}
       stateFile={stateFile}
       setStateFile={setStateFile}
  />}
     
      </Modal>
    </>
    )
}
