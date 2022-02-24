import React from 'react'
import { Button,Image } from 'antd';

import { axiosURL } from '../config/axiosURL';
import { saveAs } from "file-saver";
import { DownloadOutlined } from '@ant-design/icons';

export const PdfoImg = ({file,style,width=100,height=100}) => {
 if (file===undefined) {
    return 'No hay archivo'
  }else{
    const extension = file?.split('.');
     const descargarPDF = async (pdf) => {
    let res = await axiosURL.get("/descarga/pdf", {
      headers: { archivo: pdf },
      responseType: "blob",
    });
    const pdfBlob = await new Blob([res.data], { type: "application/pdf" });
    saveAs(pdfBlob, `${pdf}`);   
  };
     return (
        <>{
        extension?.[1] === 'pdf'?
        <Button type="link" onClick={() => descargarPDF(file)} >
        <DownloadOutlined style={style}/> 
        </Button>
        :
    <Image
  style={{ width: width, height: height, borderRadius:20 }}
  alt="example"
  src={file}

/>
}
 </> )}
 

 



               

    
}



