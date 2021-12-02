import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { getReducer } from '../reducers/getReducer';
import { rendicionesReducer } from '../reducers/rendicionesReducer';
import { vacacionesReducer } from '../reducers/vacacionesReducer';
import { sccReducer, } from '../reducers/sccReducer';
import { articulosReducer } from '../reducers/articulosReducer';
import { tallesReducer } from '../reducers/tallesReducer';
import { abrirCerrarModalReducer } from '../reducers/abrirCerrarModal';



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const actionSanitizer = (action) => (
    action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
    { ...action, data: '<<LONG_BLOB>>' } : action
  );
const reducers = combineReducers({
auth:authReducer,
peticiones_GET:getReducer,
rendiciones:rendicionesReducer,
vacaciones:vacacionesReducer,
solicitudControlCalidad:sccReducer,
articulos:articulosReducer,
listaTalles:tallesReducer,
modal:abrirCerrarModalReducer,
})


   export  const store = createStore(
        reducers,
      
        composeEnhancers(
            applyMiddleware(thunk),
            actionSanitizer,
           (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
        )
     );
     
/* store.subscribe(()=>{
     console.log('cambio el estado',store.getState());
 })
 */