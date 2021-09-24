import React from "react"
import {Image } from 'antd';

export const CardImgResponse=({data})=>{


    return(
        <Image
        width={150}
        height={150}
        src={data[0]?.src}
      />
    )
}