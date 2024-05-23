import { useContext, useMemo, useState } from "react";
import { useFetch } from "../../hooks/";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import styled from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background-color: var(--secondary-color);
  display: flex; 
  justify-content: center; 
  align-items: center; 
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 1.9rem 1.3rem;
  height: auto;
  background-color: var(--light-secondary-color);
  border-radius: 20px;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 

  @media (max-width: 575.98px) {
    width: 80%;
  }
`;

const H2 = styled.h2`
  margin-bottom: 1.2rem;
  letter-spacing: 1px;
  font-size: 30px;
`;

const UserDataWrapper = styled.div`
  margin-bottom: 1.25rem;
`;

const ParagraphUserData = styled.p`
  font-size: 15px;
` ;

const Form = styled.form`
  width: 100%;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.125rem 0.4rem;
  font-size: 14px;
  height: 35px;
`;

const SubmitButton = styled.button`
  width: 100%;
  font-size: 16px;
  margin: 0px auto;
  margin-top: 12px;
  outline: none;
  background-color: var(--primary-color);
  border: none;
  color: #fff;
  padding: 0.4rem 0.4rem;
  border-radius: 2px;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  &:hover{
    background-color: #61a3be;
  }
`;

const ParagraphError = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: red;
`;



export const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const schema = yup.object().shape({
    username: yup.string().required("Required"),
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
      <Section>
        <FormWrapper>
          <H2>Login</H2>

          {!isLoading && (
            <UserDataWrapper>
              <ParagraphUserData>
                <strong>Username:</strong> {results[0]?.login.username}
              </ParagraphUserData>
              <ParagraphUserData>
                <strong>Password:</strong> {newPassword}
              </ParagraphUserData>
            </UserDataWrapper>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper>
              <Input type="text" {...register('username')} placeholder="Username"/>
              <ParagraphError>{errors.username?.message}</ParagraphError>
            </InputWrapper>

            <InputWrapper>
              <Input {...register('password')} placeholder="Password"/>
              <ParagraphError>{errors.password?.message}</ParagraphError>
            </InputWrapper>

            {
              (!isFormValid.isValid) && <ParagraphError>{isFormValid.errorLogin}</ParagraphError>
            }

            <SubmitButton type="submit">Login</SubmitButton>
          </Form>
        </FormWrapper>
      </Section>
    </>
  );
};
