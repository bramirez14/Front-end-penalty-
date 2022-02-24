import React, { useState } from "react";
import "./App.less";

import { RoutesCompenent } from "./routes/Routes";
import { UserContext } from "./context/UserContext";
import { PeticionJWT } from "./auth/PeticionJWT";
import { SocketProvider } from "./context/SocketContext";
import {Provider} from 'react-redux'
import { store } from "./redux/store/store";



function App() {
  PeticionJWT();
  const [openn, setOpen] = useState(false);
  const [auth, setAuth] = useState(false)
  const [arrayUsuarios, setArrayUsuarios] = useState()
  const [msj, setMsj] = useState([])
  const [usuarios, setUsuarios] = useState([])
const [alertas, setAlertas] = useState([])

  return (
  
  <Provider store={store}>
    <UserContext.Provider
      value={{
        open: openn,
        setOpen: setOpen,
        auth:auth,
        setAuth:setAuth,
        arrayUsuarios:arrayUsuarios,
        setArrayUsuarios:setArrayUsuarios,
        msj:msj,
        setMsj:setMsj,
        usuariosIO:usuarios,
        setUsuariosIO:setUsuarios,
        alertas:alertas,
        setAlertas:setAlertas,
       
      }}
    >
   <SocketProvider>

          <RoutesCompenent/>
      </SocketProvider>

    </UserContext.Provider>
</Provider>
     
  );
}

export default App;
