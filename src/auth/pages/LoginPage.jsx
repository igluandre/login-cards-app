import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useContext, useState } from "react";
import { useFetch } from "../../hooks/";
import "./styles/LoginPage.css";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  
  const { login } = useContext(AuthContext);

  const schema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string()
      .min(5, 'Debe de tener al menos 5 caracteres')
      .matches(/[?=.*\W]/, 'Debe de contener un cáracter especial')
      .required("Required"),
  })

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [isFormValid, setIsFormValid] = useState({
    isValid: true,
    errorLogin: "",
  });

  const url = "https://randomuser.me/api";
  const { data: dataApi, isLoading } = useFetch(url);
  const { results = [] } = !!dataApi && dataApi;

  const onSubmit = (data) => {
    const { username, password } = data;
    if (username.length <= 1 || password.length <= 1) return;

    if (username.trim() !== results[0]?.login.username && password.trim() === results[0]?.login.password) {
      setIsFormValid({
        isValid: false, 
        errorLogin: 'El username es incorrecto'
      });
    }else if(username.trim() === results[0]?.login.username && password.trim() !== results[0]?.login.password){
      setIsFormValid({
        isValid: false, 
        errorLogin: 'La contraseña es incorrecta'
      });
    }else if (username.trim() !== results[0]?.login.username && password.trim() !== results[0]?.login.password) {
      setIsFormValid({
        isValid: false, 
        errorLogin: 'Username o contraseña inválidos'
      });
    }else{
      // login(username);
      setIsFormValid({
        isValid: true, 
        errorLogin: ''
      });
      console.log('login exitoso')
    }
    
  };

  return (
    <>
      <div className="form-section flex flex-d-column">
        <div className="form-container flex flex-d-column">
          <h2>Login</h2>

          {!isLoading && (
            <div className="user-data">
              <p>
                <strong>Username:</strong> {results[0]?.login.username}
              </p>
              <p>
                <strong>Password:</strong> {results[0]?.login.password}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <label>Username: </label>
              <input type="text" {...register('username')}/>
              <p className="error-login">{errors.username?.message}</p>
            </div>

            <div className="input-container">
              <label>Password: </label>
              <input {...register('password')}/>
              <p className="error-login">{errors.password?.message}</p>
            </div>

            { 
              (!isFormValid.isValid) && <p className="error-login">{isFormValid.errorLogin}</p> 
            }

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};
