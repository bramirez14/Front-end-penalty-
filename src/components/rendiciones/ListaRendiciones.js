import React from 'react'
import { Encabezado } from './Encabezado'
import { Form, Input, Button, Col, Row, Card, Select, Divider } from "antd";
import { CardRendiciones } from './CardRendiciones';
import {Link} from 'react-router-dom'

export const ListaRendiciones = ({match}) => {
    const { id } = match.params;
    console.log(id);
    return (
        <div className ='contenedor-form' >
        <Encabezado/>
        <Row>
            <Col>
        <Link to={`/crear/rendicion/${id}`}>
            <Button style={{marginTop:'10px'}}> Agregar Rendicion</Button>
            
            </Link>

            <CardRendiciones/>
            <CardRendiciones/>
            </Col>
            

        </Row>
           
        </div>
    )
}
