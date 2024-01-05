import { useEffect, useState } from "react";
import "../style/TrackWorkout.scss";
import { SelectModal } from "../components/SelectModal";
import { Link } from "react-router-dom";
import { IExerciseToAdd, ISet } from "../models/IWorkout";
import axios from "axios";

export const TrackWorkout = () => {
  const [show, setShow] = useState(false);
  const [exercises, setExercises] = useState<IExerciseToAdd[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const foundExercises = JSON.parse(
      localStorage.getItem("addedExercise") || "[]"
    );
    setExercises(foundExercises);

    const foundToken = localStorage.getItem("token") || "";
    setToken(foundToken);
  }, []);

  const addSet = (exercise: IExerciseToAdd) => {
    const lastSet: ISet[] = exercise.set.slice(-1);
    const lastId = lastSet[0].id;
    console.log(lastId);
    const set: ISet = {
      id: lastId + 1,
      reps: 0,
      weight: 0,
    };
    exercise.set.push(set);
    localStorage.setItem("addedExercise", JSON.stringify(exercises));
    setExercises([...exercises, exercise]);
    window.location.reload();
  };

  /* const deleteSet = (exercise: IExerciseToAdd, set: ISet) => {
    const i = exercise.set.indexOf(set);
    exercise.set.splice(i, 1);

    setExercises([...exercises, exercise]);
    console.log(exercises);
  }; */

  const handleSaveWorkout = () => {
    console.log(exercises);
    const configuration = {
      method: "post",
      url: `http://localhost:3000/user/workouts`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        exercises: exercises,
        planned: false,
      },
    };

    axios(configuration)
      .then(() => {
        alert("Workout added!");
      })
      .catch(() => {
        throw new Error();
      });

    localStorage.removeItem("addedExercise");
  };

  const handleRepChange = (
    set: ISet,
    value: number,
    exercise: IExerciseToAdd
  ) => {
    set.reps = value;
    localStorage.setItem("addedExercise", JSON.stringify(exercises));
    setExercises([...exercises, exercise]);

    window.location.reload();
  };

  const handleWeightChange = (
    set: ISet,
    value: number,
    exercise: IExerciseToAdd
  ) => {
    set.weight = value;
    localStorage.setItem("addedExercise", JSON.stringify(exercises));
    setExercises([...exercises, exercise]);

    window.location.reload();
  };

  const showExercises = exercises.map((exercise) => {
    return (
      <div className="exercise" key={exercise.exerciseId}>
        <div className="exercise-header">
          <p>{exercise.name}</p>
          <span className="material-symbols-outlined">cancel</span>
        </div>
        <div className="exercise-container">
          {exercise.set.map((set) => {
            return (
              <div className="set" key={set.id}>
                <div className="set-id">{set.id}</div>
                <input
                  value={set.reps}
                  name="reps"
                  className="set-rep"
                  placeholder={`${set.reps} reps`}
                  onChange={(e) =>
                    handleRepChange(set, Number(e.target.value), exercise)
                  }
                />
                <input
                  name="weight"
                  className="set-weight"
                  placeholder={`${set.weight} kg`}
                  onChange={(e) =>
                    handleWeightChange(set, Number(e.target.value), exercise)
                  }
                />
                <span
                  className="material-symbols-outlined"
                  // onClick={() => deleteSet(exercise, set)}
                >
                  delete
                </span>
              </div>
            );
          })}
          <div
            className="add-set"
            onClick={() => {
              addSet(exercise);
            }}
          >
            Add set
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <header className="proceed-or-cancel">
        <Link to="/home">
          <span className="material-symbols-outlined">cancel</span>
        </Link>
        <Link to="/home">
          <span
            className="material-symbols-outlined"
            onClick={() => {
              handleSaveWorkout();
            }}
          >
            done
          </span>
        </Link>
      </header>
      <div className="main-content">
        <div className="add-btn" onClick={() => setShow(true)}>
          <p>Add exercise</p>
        </div>
        <SelectModal
          onClose={() => {
            setShow(false),
              setExercises(
                JSON.parse(localStorage.getItem("addedExercise") || "[]")
              );
          }}
          show={show}
        />
        <div className="exercises">{showExercises}</div>
      </div>
    </>
  );
};
