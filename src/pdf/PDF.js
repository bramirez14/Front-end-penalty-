import React from 'react'
import Pdf from "react-to-pdf";
import { ListaRendiciones } from '../components/rendiciones/ListaRendiciones';
const ref = React.createRef();
console.log(ref);
export const PDF = () => {
    return (
        <div className="App">
      <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>generear PDF</button>}
      </Pdf>
      <div ref={ref}>
        <h1 >Hello</h1>
        <h1>Hello CodeSandbox</h1>
        <h1>Hello CodeSandbox</h1>
        <h1>Hello CodeSandbox</h1>
       
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </div>
    )
}
