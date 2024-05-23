import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useContext, useMemo, useState } from "react";
import { useFetch } from "../../hooks/";
import "./styles/LoginPage.css";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const schema = yup.object().shape({
    username: yup.string()
      .min(3, 'Debe tener al menos 3 caracteres')
      .required("Required"),
    password: yup.string()
      .min(5, 'Debe de tener al menos 5 caracteres')
      .max(18, 'Debe tener máximo de 18 caracteres')
      .matches(/(?=.*\W)/, 'Debe de contener un cáracter especial')
      .matches(/[?=.*0-9]/, 'Debe de contener al menos un numero')
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

  const newPassword = useMemo(() => {
    if (results[0]?.login.password) {
      let currentPassword = (results[0]?.login.password)?.split('');
      const specialCharacteres = '@.#$!%*?&^';
      const randomNumberCharacter = Math.floor(Math.random() * currentPassword?.length);
      const randomNumber = Math.floor(Math.random() * currentPassword?.length);
      currentPassword.splice(randomNumberCharacter, 0, specialCharacteres[randomNumberCharacter])
      currentPassword.splice(randomNumber, 0, randomNumber)

    return currentPassword.join('')
    }else{
      return results[0]?.login.password
    }

}, [dataApi]);


  const onSubmit = (data) => {
    const { username, password } = data;
    if (username.length <= 1 || password.length <= 1) return;

    if (username.trim() !== results[0]?.login.username && password.trim() === newPassword) {
      setIsFormValid({
        isValid: false,
        errorLogin: 'El username es incorrecto'
      });
    }else if(username.trim() === results[0]?.login.username && password.trim() !== newPassword){
      setIsFormValid({
        isValid: false,
        errorLogin: 'La contraseña es incorrecta'
      });
    }else if (username.trim() !== results[0]?.login.username && password.trim() !== newPassword) {
      setIsFormValid({
        isValid: false,
        errorLogin: 'Username o contraseña inválidos'
      });
    }else{
      login(username);
      setIsFormValid({
        isValid: true,
        errorLogin: ''
      });
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
                <strong>Password:</strong> {newPassword}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <input type="text" {...register('username')} placeholder="Username"/>
              <p className="error-login">{errors.username?.message}</p>
            </div>

            <div className="input-container">
              <input {...register('password')} placeholder="Password"/>
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
