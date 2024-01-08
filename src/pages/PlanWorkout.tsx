import { useEffect, useState } from "react";
import "../style/TrackWorkout.scss";
import { SelectModal } from "../components/SelectModal";
import { Link } from "react-router-dom";
import { IExerciseToAdd, ISet } from "../models/IWorkout";
import axios from "axios";

export const PlanWorkout = () => {
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

  const addSet = (id: string) => {
    const exercise: IExerciseToAdd = exercises.find(
      (exercise) => exercise.exerciseId === id
    )!;

    if (exercise.exerciseId === id) {
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
    }
  };

  const deleteExercise = (id: string) => {
    const exercise: IExerciseToAdd = exercises.find(
      (exercise) => exercise.exerciseId === id
    )!;

    if (exercise.exerciseId === id) {
      const index = exercises.indexOf(exercise);
      exercises.splice(index, 1);

      localStorage.setItem("addedExercise", JSON.stringify(exercises));
      setExercises(exercises);
    }
  };

  const deleteSet = (exercise: IExerciseToAdd, set: ISet) => {
    const i = exercise.set.indexOf(set);
    exercise.set.splice(i, 1);

    localStorage.setItem("addedExercise", JSON.stringify(exercises));
    setExercises([...exercises, exercise]);
  };

  const handleSaveWorkout = () => {
    console.log(exercises);
    const configuration = {
      method: "post",
      url: `http://localhost:3000/user/workouts`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        exercises: exercises,
        planned: true,
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
    id: number,
    value: number,
    exercise: IExerciseToAdd
  ) => {
    console.log(id);
    const set: ISet = exercise.set.find((set) => set.id === id)!;
    if (set.id === id) {
      set.reps = value;
      localStorage.setItem("addedExercise", JSON.stringify(exercises));
      setExercises([...exercises, exercise]);
    }
  };

  const handleWeightChange = (
    id: number,
    value: number,
    exercise: IExerciseToAdd
  ) => {
    const set: ISet = exercise.set.find((set) => set.id === id)!;
    if (set.id === id) {
      set.weight = value;
      localStorage.setItem("addedExercise", JSON.stringify(exercises));
      setExercises([...exercises, exercise]);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("addedExercise");
  };

  const showExercises = exercises.map((exercise) => {
    return (
      <div className="exercise" key={exercise.exerciseId}>
        <div className="exercise-header">
          <p>{exercise.name}</p>
          <span
            className="material-symbols-outlined"
            onClick={() => deleteExercise(exercise.exerciseId)}
          >
            cancel
          </span>
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
                    handleRepChange(set.id, Number(e.target.value), exercise)
                  }
                />
                <input
                  value={set.weight}
                  name="weight"
                  className="set-weight"
                  placeholder={`${set.weight} kg`}
                  onChange={(e) =>
                    handleWeightChange(set.id, Number(e.target.value), exercise)
                  }
                />
                <span
                  className="material-symbols-outlined"
                  onClick={() => deleteSet(exercise, set)}
                >
                  delete
                </span>
              </div>
            );
          })}
          <div
            className="add-set"
            onClick={() => {
              addSet(exercise.exerciseId);
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
          <span
            className="material-symbols-outlined"
            onClick={() => {
              handleCancel();
            }}
          >
            cancel
          </span>
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
        <div id="exercises" className="exercises">
          {showExercises}
        </div>
      </div>
    </>
  );
};
