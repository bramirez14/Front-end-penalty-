import React, { useContext } from 'react'
import { Encabezado } from './Encabezado'
import { Form, Input, Button, Col, Row, Card, Select, Divider } from "antd";
import { CardRendiciones } from './CardRendiciones';
import {Link} from 'react-router-dom'
import axiosURL from '../../config/axiosURL';
import PeticionGET from '../../config/PeticionGET';
import { SubEncabezado } from './SubEncabezado';
import { UserContext } from '../../contexto/UserContext';
export const ListaRendiciones = ({match}) => {
    const { id } = match.params;
    console.log(id);
    const peticionGastoId = PeticionGET(`/gastos/${id}`)
    const todasLasRendicones = peticionGastoId?.rendicion 
const Text = useContext(UserContext)
const {open}=Text

    return (
        <div className={!open?'contenedor-rendicion':'contenedor-rendicion-active'}>

        <div className ='contenedor-form' >
        <Encabezado/>
        <SubEncabezado uuid={id}/>
        <Row>
            <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
        <Link to={`/crear/rendicion/${id}`}>
            <Button style={{marginTop:'10px'}}> Agregar Rendicion</Button>
            
            </Link>
            {todasLasRendicones?.map(t=>
                
                <CardRendiciones
                key={t.id}
                {...t}
                uid={id}
                />
            
            )
            }
            
            
            </Col>
            

        </Row>
           
        </div>
        </div>

    )
}
