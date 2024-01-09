import "../style/ExerciseDetails.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { IUser, defaultUser } from "../models/IUser";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { IExercise } from "../models/IExercise";

export const ExerciseDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(defaultUser);

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [exercises, setExercises] = useState<IExercise[]>(
    JSON.parse(localStorage.getItem("listOfExercises") || "[]")
  );

  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const exrcisesToShow: IExercise = exercises.find(
    (exercise) => exercise._id === params.id
  )!;

  const handleBackToBrowseExercises = () => {
    navigate("/exercises");
  };

  return (
    <>
      <HeaderStyled>
        <h2>Hi, {user.username}!</h2>
      </HeaderStyled>
      <div className="container">
        <ButtonStyled
          className="go-back-btn"
          onClick={() => handleBackToBrowseExercises()}
        >
          Browse exercises
        </ButtonStyled>
        <div className="exercise-detail-content">
          <h2>{exrcisesToShow.name}</h2>
          <div className="muscle-lists">
            <div className="primary-secondary">
              <p>Primary</p>
              <ul>
                {exrcisesToShow.primary.map((muscle) => {
                  return (
                    <li key={exrcisesToShow.primary.indexOf(muscle)}>
                      {muscle}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="primary-secondary">
              <p>Secondary</p>
              <ul>
                {exrcisesToShow.secondary.map((muscle) => {
                  return (
                    <li key={exrcisesToShow.secondary.indexOf(muscle)}>
                      {muscle}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="desc">
            <p>{exrcisesToShow.description}</p>
          </div>
          <div className="instructions">
            <p>{exrcisesToShow.instructions}</p>
          </div>
        </div>
      </div>
    </>
  );
};
