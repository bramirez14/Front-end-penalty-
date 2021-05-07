import React, { useContext } from 'react'
import { Encabezado } from './Encabezado'
import { Button, Col, Row} from "antd";
import { CardRendiciones } from './CardRendiciones';
import {Link} from 'react-router-dom'
import axiosURL from '../../config/axiosURL';
import PeticionGET from '../../config/PeticionGET';
import { SubEncabezado } from './SubEncabezado';
import { UserContext } from '../../contexto/UserContext';
import { saveAs } from 'file-saver';



export const ListaRendiciones = ({match}) => {
    const { id } = match.params;
    console.log(id);
    const peticionGastoId = PeticionGET(`/gastos/${id}`)
    const todasLasRendicones = peticionGastoId?.rendicion 
    const sumaGastos=   todasLasRendicones?.map(sg=> sg.importe)
     const totalDeImporte = sumaGastos?.reduce((acumulador,item)=>{return acumulador = parseFloat(acumulador)+parseFloat(item)})
console.log(todasLasRendicones);
const Text = useContext(UserContext)
const {open}=Text

 const handleClick= async ()=>{
     let res= await axiosURL.post('/generar/pdf',todasLasRendicones)
     console.log(res);
     if(res.status===200){
        let ge =  await axiosURL.get('peticion/pdf', { responseType: 'blob' });
        console.log(ge.data);
        const pdfBlob = await new Blob([ge.data],{ type: 'application/pdf' });
           saveAs(pdfBlob, 'penaltyIntranet.pdf');
     }
     /* axiosURL.post('/generar/pdf', todasLasRendicones)
      .then(() => axiosURL.get('peticion/pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'penaltyIntranet.pdf');
      }) */
     
 }
    return (
        <div className={!open?'contenedor-rendicion':'contenedor-rendicion-active'}>

        <div className ='contenedor-form' >
      
        <Encabezado/>
        <SubEncabezado uuid={id} total={totalDeImporte}/>
        <Row >
            <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
        <Link to={`/crear/rendicion/${id}`}>
            <Button style={{marginTop:'10px'}}> Agregar Gasto</Button>
            
            </Link>
            {todasLasRendicones?.map(t=>
                
                <CardRendiciones
                key={t.id}
                {...t}
                uid={id}
                />
            
            )
            }
           
          {/*   <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        
      </Pdf> */}
    

            </Col>
            <Col offset={21}>
      <Button  style={{marginTop:'10px'}} onClick={handleClick}> Generate Pdf</Button>

      </Col>
        </Row>
           
          
        </div>

        </div>

    )
}
