import React from 'react'
import { Spin, Alert } from 'antd';
export const Loading = ({props,spinner=false}) => {
    return (
        <Spin tip="Cargando..." spinning={spinner}  className='spinner' >
            {props}
      </Spin>
    )
}
