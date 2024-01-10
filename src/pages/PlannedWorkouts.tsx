import "../style/PlannedWorkouts.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser, defaultUser } from "../models/IUser";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { IWorkout } from "../models/IWorkout";

export const PlannedWorkouts = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(foundUser);

      const foundWorkouts = JSON.parse(
        localStorage.getItem("planned-workouts") || "[]"
      );
      setWorkouts(foundWorkouts);
    };

    fetchData();
  }, []);

  const handleBackToHome = () => {
    navigate("/home");
  };

  const plannedWorkouts = workouts.map((workout) => {
    return (
      <div className="planned-workout" key={workout._id}>
        <Link to={workout._id} key={workout._id}>
          <ol type="1">
            {workout.exercises.map((exercise) => {
              return <li key={exercise.exerciseId}>{exercise.name}</li>;
            })}
          </ol>
        </Link>
      </div>
    );
  });

  return (
    <>
      <HeaderStyled>
        <h2>Hi, {user.username}!</h2>
      </HeaderStyled>
      <div className="main-content">
        <ButtonStyled
          className="go-back-btn"
          onClick={() => handleBackToHome()}
        >
          Back to home page
        </ButtonStyled>
        <div className="content">{plannedWorkouts}</div>
      </div>
    </>
  );
};
