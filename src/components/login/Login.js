import React, { useState,useContext,useRef,useEffect} from "react";
import { useNavigate } from "react-router";
import "./login.css";
import {axiosURL} from "../../config/axiosURL";
import { UserContext } from "../../context/UserContext";

export const Login = ( ) => {
const navigate=useNavigate();
const {setAuth} = useContext(UserContext)
  const tipo = localStorage.getItem('type')
  const [cargandoUsuario, setCargandoUsuario] = useState(true)
  const [token, setToken] = useState()
  const [errores, setErrores] = useState([]);
  const [msg, setMsg] = useState();
  const [user, setUser] = useState({
    email: '',
    password: '',
    conectado:'SI'
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  //Verificacion de datos
  const verifyUser = async (e) => {
    
    let result = await axiosURL.post(
      "/login",
      user
    );
    let tipo= result.data.user?.tipousuario
    setErrores(result.data);
    if (!!result.data.user) {
      localStorage.setItem('uid', result.data.user.id);
     localStorage.setItem('token',result.data.token);
     localStorage.setItem('type', tipo);
     localStorage.setItem('N',result.data.user.nvendedor)
     setAuth(true)
     navigate('/perfil')
      

    } else {
      setMsg(result.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyUser();
  };
  

  return (
    <>
    <div className="l-form-login">
    <form action='' className="form-login" onSubmit={handleSubmit}>
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0ODQ0PDQ0QDw0PDw8NDQ8NDQ8QFhEXFiASFRgYHTQhJBslHhMXIT0tJSkrMC4uGB8zOjMtNyguLisBCgoKDQ0NGhAQGzElHyUrKy0wLDI3LzExLS0tLTctLTcrNy0uLTcxKy0rKystNTcvLi01LS0rKzU1Kys1LS0rK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAAMBAQEBAAAAAAAAAAAAAQQFBgcDAgj/xABGEAACAgECAwQFBgsECwAAAAAAAQIDBAURBhIhBxMxcRRBUWGBFyIyQpGTI1JUcqGxwdHT4fAVU6KyFjQ1RGJjZHSCg5L/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAApEQEBAAECAwUJAAAAAAAAAAAAAQIDESExkQQSIkFRBSMyQmGBobHR/9oADAMBAAIRAxEAPwD3EAAAAAIAAAAAAoEAKBACgQpCgQAAUAAAAAAAAAACFAAAAAAAAAEBQBACgQAAAAAAAAAAAABQQAUEAFBABQQAUEAApCgCFIBQAABCgQoAAAAAAABCgAQoAAAQAoEAKBACgQAoEAAAFAEBSACgAQpCgAAAAAAAAQpCgAQoAAAQAoEAKBACgQAoEAAAFAAgAApAAKQAUEAFBABQCACggFAIBQCAAUAQFAEBQBAUAQFAEKABAAAAAFBABQQAUEAFAIBSFAAgb26vojEu1TGr+nkVR87IhFsnNmENLbxZpkPpZtKf5x8v9NNK/K4PyUv3EbxndfSnzTq6AGijxhpb/wB8rXnuv2H3q4k06f0cyh/+yK/WN4TW07yynVtgY9ObTZ9C6uf5s4yMglpLLyAAEgAAAAAAAIAAAAAAoAgKAIUEAoBAKQpAMfIw4W/Sc/8AxslH9RrMnhiizflvy6X7asu1bfBtr9BuwRsplp4Zc44vN4X1KtN4mp2T28IZPK9/c5bfsOV1LM1HEbWdgY1kd9ue7FjKMvKdbX9eo9ePzbVGcXGcVOL8YySlF+aZW4ejk1ewy/BlZes/LxyGfo1/TIwrcWT+viW8yXv5ZfuMqvhPDy1vp+pQsfqryI8lnk+if6Dpdf7Pce5OeG1jWePd7b0y923q+H2HnOqaVk4VnJkVSrlv82X1Je+MkUss5x5Gvp56N97hLPWcP0zdR4Q1HG3c8Zzivr0tWx8+nX7Ua6nOyaXtC+6pp/RjbZDZ+9bmz0ri3UMTZQvlZBfUu/Cx+DfVfadBHjLT8tcuo6dDf+8rUbPj4KS+DZXh5VljjoZccM7jfr/Y5/H4w1Ovwy5y901Gf60bGntF1KPisez8+mW/+GSM+rQ9DzpcuHdkwsf1K65z5fPmWyXmzd6X2d4dM1O6c8nbwhYoxr+KXiWky8q6tLQ7bb4M+Hru+PD/ABNq+e13WHRGv6183ZGpeS33fwO1oU1Fd5JSn63GLhHf3Jt9Piy11xglGKUYpbJRSSS9iR+zWTZ7Wjp5YY+LLegAJbAAAgAA1HFfEeNpGHPMyu8dUHCPLVFTslKT2SSbS+1o4L5etF/JdR+5xv4xndvv+wLP+4xv8zNPkaXxNKvEel1ad6G8PD5O8qo7zfuY7uXOt999wN5w92xaNqGTXixWTjWWyUK5ZVVUK5TfRR3hN7N+/Y3fGPHmm6KorMslK2S5o0URVl7j1+ds2kl09bR53XwBxDqWdgWau8OjHxbe83xo1RskuaEnFKC6t92l18NzU5jUeLNZ9L9HjmOif9mvP/1Xv9qu7336fQ5tt+m/vA635etF/JdR+4xv4xu9F7U9MzcPUMyuGVCvBhCy6FtVatkpb7cnLNptuLXVr7DhObin++0P/wC8A6fX5XPhHP8ASpYk8tUPv3g8ndb94tt+XpvtsB0vB/H2mazvHEtlG5Ld498VXel7Uk2mvJs3etapVg4t+XfzdzRXKyfIuaTS9SXtPFdL7Onm6Fpep6XJ42r1VSmnCSgshxtltu/VPZbb+D8H7srP7Sq8/QtTwNRXomrQx7K5Vzi4Rukmusd/CX/C/huB63oWt4+fhU51LcaLa+8XepQlBLxU+uy22fr26eJxus9s2h4ljrjO/LlF7SeJVGcF0/GnKKfw3OQ1bLsq4BxVXJx7x11z2ezcHbLePk9jX8JcQ20YtUNJ4V9IiopTyr4ytsvlt86TfL7d/BvpsB6zwp2h6Tq8lXi3uN7Taovj3Vz2W72W+z29zZmavxbh4efg6fd3npGbzd04wTqi09kpvfdbvotk/Drsfz1x1rylbjXrRZaJqdVqsVle8K7Yx678vKuqlt7eh6B2kZEY8TcMW2yjCP4GUpSajFb3etvzA9N4q4hx9Jw7M3KVkqq3BNUxU7G5S2SSbS8X62jgfl60X8l1H7nG/jHodmr4E04yysaUX4xldU0/NNnmPb/Vj/2Ri2UQq2llR2nVGGzXJL1xA2WB24aPfdTTHHz4ytsrrUp0UcqcpKO75bW9uvqTZ0vD/H2majlZGHTbKvJpssrdd8VXK3kezlX16rfyfuN5i6fjqNclRUpJQaaqgmnt4p7HH9oHZphaqpZNT9D1CPz45FS2U5JdO8S8fBdVs0B1XEOvYmmY8snMujVVHw36zm/xYR8W/IwuH9Xwte0+ORCmcsax2Q7vJrjGacXyvom18UzyDs04cfErnqet5luVXiTVMaZvaMlGCnvN/i/OXhs3t1Z7Tw/qmDfX3WE4qulRgq41yqUIeC5U14dAiyWbVyWtdm0ZNywbVD/lXuTgvKSTf2pmJo3ZvdKe+bZGFa+pTJynP4tbJf10PTgU7mLivs7s9z72328mHpmmUYlaqx6o1wXs8X7231b8zLKC7tmMk2gAAkAAAAAQAAaribh/F1XFniZcZSplKEvmScJKUXummjYYmNCmquqtbV1whXBb77Ritl+hH1AA5zizgfTNY5Hm0c1kFtG2uTrtS6/Ncl4rrvszpAB5n8iGh/8AU/f/AMjc6P2Z6Vh4udiVQtdWbCEL+e5uTjHdrl9mzk2dmAMHRNKowMWnEx4uNFMOSCb5ntvvu37W22abingLStWkrMzGTuS276qTquaXgpNeKXv3OnAHM5fA2n3aXXpM4WeiV8jilY1ZvGW+/N8WdBiY0Ka66q48tdcYwhFeqKWyR9gBo+LOFcLWKYUZsJShCyNkXCThNNdNt/Y02j5cV8Gadq9VVebU5dzv3U4ScLK90k0mvU9l0fsR0IA80+RDQvZk/f8A8jeW9nOlT02nTJV2PFptd0Pw0lZztttuXv5n9p14AkYpJJeCSSDW/R+DKANFwtwlg6Tj242HCSqtslZNWTdjbcVHbd+raKRnabpFGK5Sqi+aUYQ3k+ZqEd9oL3LczwAAAAAAAAAAAAAAAAAAAEBSAAAAKQoAEKABCgAAAAIBQAAAAAAAAAAAAAAAAAAAAEAAAAACkKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAApCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQFIAAAApCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAKQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAUAQAAAAAAAAAAAAABQBAUAAAAAAAAAAAAAAAAAf//Z"
          className="imagen-penalty"
          alt="img"
        />
        {msg === undefined ? '' : <h6 className="msg">{msg}</h6>}

        {errores.errors === undefined
          ? ''
          : errores.errors.map((err, i) => <h5 key={i}>{err.msg}</h5>)}

            <div className="form__div">
                <input type="text" className="form__input" name="email" placeholder=" "
                 onChange={handleChange}
                 required/>
                <label  className="form__label">Email</label>
            </div>

            <div className="form__div">
                <input type="password" className="form__input" name="password" placeholder=" "
                 onChange={handleChange}
                 required/>
                <label  className="form__label">Password</label>
            </div>

            <button  className="button" >Ingresar</button>
        </form>
      </div>
    </>
  );
};
