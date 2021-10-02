import { types } from "../types/type"
import axios from 'axios'

/* export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );
        
        
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {
                dispatch(login( user.uid, user.displayName ));

                dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

        
        
    }
} */

export const login = (uid,displayName)=>({
    type:types.login,
    payload:{ 
        uid,
        displayName
    }
})

export const fetchThunk = () => async (dispatch) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
      const datas = await response.data
      const todos = datas.slice(0, 10)
     dispatch({ type:types.axiosget, payload: todos })
    } catch(e) {
      dispatch({ type: 'error', error: e.message })
      console.log(e)
    }
  } 