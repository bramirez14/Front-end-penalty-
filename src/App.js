import React,{useState} from 'react';
import "react-pro-sidebar/dist/css/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/antd.css'; 
import './App.css';

import { Routes } from './routes/Routes';
import { UserContext } from './contexto/UserContext';
import { PeticionJWT } from './auth/PeticionJWT';

function App() {
  const [openn,setOpen] = useState(false);
  PeticionJWT()
  return (
    <UserContext.Provider value={{
      open:openn,
      setOpen:setOpen,
      
    }}>
      <Routes/>
    </UserContext.Provider>
     
    
  );
}

export default App;

