import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

import { Routes } from './routes/Routes';
import { UserContext } from './contexto/UserContext';

function App() {
  const [openn,setOpen] = useState(false);
  const [storage, setStorage] = useState();

  return (
    <UserContext.Provider value={{
      open:openn,
      setOpen:setOpen,
      storage:storage,
      setStorage:setStorage,
     
    }}>
      <Routes/>
    </UserContext.Provider>
     
    
  );
}

export default App;

