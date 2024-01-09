import { useState, useEffect } from "react";
import "../style/BrowseExercises.scss";
import { IUser, defaultUser } from "../models/IUser";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { Link, useNavigate } from "react-router-dom";
import { IExercise } from "../models/IExercise";

export const BrowseExercises = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [exercises, setExercises] = useState<IExercise[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);

    const foundExercises = JSON.parse(
      localStorage.getItem("listOfExercises") || "[]"
    );
    setExercises(foundExercises);
  }, []);

  const handleBackToHome = () => {
    navigate("/home");
  };

  const listOfexercises = exercises.map((exercise) => {
    return (
      <div className="exercise-to-show" key={exercise._id}>
        <Link to={exercise._id} key={exercise._id}>
          <h2 key={exercise._id}>{exercise.name}</h2>
        </Link>
      </div>
    );
  });

  return (
    <>
      <HeaderStyled>
        <h2>Hi, {user.username}!</h2>
      </HeaderStyled>
      <div className="container">
        <ButtonStyled
          className="go-back-btn"
          onClick={() => handleBackToHome()}
        >
          Back to home page
        </ButtonStyled>
        <div className="exercise-list">{listOfexercises}</div>
      </div>
    </>
  );
};
