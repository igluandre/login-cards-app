import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LoginPage } from "./LoginPage";
import { CardsPage } from "../../CardsPage/CardsPage";

export const HomePage = () => {
  const { logged } = useContext(AuthContext);

  return (
    <>
      {
        (!logged) 
            ? <LoginPage /> 
            : <CardsPage />
      }
    </>
  );
};
