import { useState, useEffect } from "react";
import { IUser, defaultUser } from "../models/IUser";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { useNavigate } from "react-router-dom";

export const BrowseExercises = () => {
  const [user, setUser] = useState<IUser>(defaultUser);

  const navigate = useNavigate();

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);
  }, []);

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <HeaderStyled>
        <h2>Hi, {user.username}!</h2>
      </HeaderStyled>
      <div className="statistics-container">
        <ButtonStyled
          className="go-back-btn"
          onClick={() => handleBackToHome()}
        >
          Back to home page
        </ButtonStyled>
      </div>
    </>
  );
};
