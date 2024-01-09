import "../style/PlannedWorkouts.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser, defaultUser } from "../models/IUser";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import axios from "axios";
import { IWorkout } from "../models/IWorkout";

export const PlannedWorkouts = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [token, setToken] = useState("");
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [showWorkouts, setShowWorkouts] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);

    const foundToken = localStorage.getItem("token") || "";
    setToken(foundToken);
  }, []);

  const handleBackToHome = () => {
    navigate("/home");
  };

  const getData = () => {
    const configuration = {
      method: "get",
      url: `http://localhost:3000/user/${user._id}/planned-workouts`,
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(configuration)
      .then((result) => {
        setWorkouts(result.data);
      })
      .catch(() => {
        throw new Error();
      });
  };

  const showPlannedWorkouts = () => {
    if (showWorkouts === false) {
      setShowWorkouts(true);
      getData();
    } else {
      setShowWorkouts(false);
      setWorkouts([]);
    }
  };

  const plannedWorkouts = workouts.map((workout) => {
    return (
      <div key={workout._id} className="workout-container">
        {workout.exercises.map((exercise) => {
          return (
            <div className="planned-workout" key={exercise.exerciseId}>
              <ul>
                <li key={exercise.exerciseId}>{exercise.name}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  });

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
        <ButtonStyled
          className="go-back-btn"
          onClick={() => {
            showPlannedWorkouts();
          }}
        >
          Show planned workouts
        </ButtonStyled>
        <div>{plannedWorkouts}</div>
      </div>
    </>
  );
};
