import React from 'react'
import { Col, Row, Card,List} from "antd";
import {Link} from "react-router-dom";
import { Tarjetas } from './Tarjetas';
export const CardAprobaciones = (array,url) => {
    return (
        <Col xs={9} sm={9} md={9} lg={9} xl={9}>
        <Card >
      <Tarjetas/>
        </Card>
     </Col>
    )
}
