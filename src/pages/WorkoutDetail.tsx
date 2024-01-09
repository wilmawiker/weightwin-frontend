import { useEffect, useState } from "react";
import { IWorkout } from "../models/IWorkout";
import "../style/WorkoutDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { IUser, defaultUser } from "../models/IUser";
import { HeaderStyled } from "../styled-components/HeaderStyled";

export const WorkoutDetail = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(defaultUser);

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [workouts, setWorkouts] = useState<IWorkout[]>(
    JSON.parse(localStorage.getItem("planned-workouts") || "[]")
  );

  const params = useParams();
  const workoutToShow: IWorkout = workouts.find(
    (workout) => workout._id === params.id
  )!;

  const handleBackToPlannedWorkouts = () => {
    navigate("/planned-workouts");
  };

  const showExercises = workoutToShow.exercises.map((exercise) => {
    return (
      <div className="exercise" key={exercise.exerciseId}>
        <div className="exercise-header">
          <p>{exercise.name}</p>
        </div>
        <div className="exercise-container">
          {exercise.set.map((set) => {
            return (
              <div className="set" key={set.id}>
                <div className="set-id">{set.id}</div>
                <p>{set.reps} reps</p>
                <p>{set.weight} kg</p>
              </div>
            );
          })}
        </div>
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
          onClick={() => handleBackToPlannedWorkouts()}
        >
          Back to planned workouts
        </ButtonStyled>
        <div className="workout-detail-content">{showExercises}</div>
      </div>
    </>
  );
};
