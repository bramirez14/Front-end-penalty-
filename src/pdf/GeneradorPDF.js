import React, { useState } from 'react';
import { saveAs } from 'file-saver';

import axiosURL from '../config/axiosURL';
const GeneradorPDF =()=>{
  const [state, setState] = useState({
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
  })

  const handleChange =(e)=>{
    const {value,name}=e.target;
    setState({...state,[name]:value})
  }

  const createAndDownloadPdf = async   () => {

   let pot= await   axiosURL.post('/create-pdf', state)
    let datos=(pot.data);
   console.log(datos);
    let ge =  await axiosURL.get('peticion/pdf', { responseType: 'blob' });
    console.log(ge.data);

  
       const pdfBlob = new Blob([ge.data],{ type: 'application/pdf' });
        saveAs(pdfBlob, 'penaltyIntranet.pdf');
  }
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange} />
        <input type="number" placeholder="Price 1" name="price1" onChange={handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={handleChange} />
        <button onClick={createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  
}

export default GeneradorPDF;
