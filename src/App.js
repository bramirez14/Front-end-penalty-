import  { useState,useEffect } from "react";
import "./App.less";

import { RoutesCompenent } from "./routes/Routes";
import { UserContext } from "./context/UserContext";
import { PeticionJWT } from "./auth/PeticionJWT";
import { SocketProvider } from "./context/SocketContext";
import {Provider} from 'react-redux'
import { store } from "./redux/store/store";
import { axiosURL } from "./config/axiosURL";



function App() {
  let TOKEN_STORAGE = (localStorage.getItem("token"));

  PeticionJWT();
  const [openn, setOpen] = useState(false);
  const [auth, setAuth] = useState(false)
  const [arrayUsuarios, setArrayUsuarios] = useState()
  const [msj, setMsj] = useState([])
  const [usuarios, setUsuarios] = useState([])
const [alertas, setAlertas] = useState([]);
const [user, setUser] = useState({});
const [dataUser, setDataUser] = useState();
const validateTOKEN = async()=> {
  let response=await axiosURL.get("/check", {
  headers: { token: TOKEN_STORAGE },
});
 const userInfo= await axiosURL.get(`/${response.data.id}`)
setUser(userInfo.data)
}
useEffect(() => {
  validateTOKEN();
}, []);
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
        user,
        setDataUser
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
