import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { getReducer } from '../reducers/getReducer';
import { rendicionesReducer } from '../reducers/rendicionesReducer';
import { vacacionesReducer } from '../reducers/vacacionesReducer';
import { sccReducer } from '../reducers/sccReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
auth:authReducer,
peticiones_GET:getReducer,
rendiciones:rendicionesReducer,
vacaciones:vacacionesReducer,
solicitudControlCalidad:sccReducer,
})


   export  const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunk)
        )
     );
     
/* store.subscribe(()=>{
     console.log('cambio el estado',store.getState());
 })
 */