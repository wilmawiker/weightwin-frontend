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
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.exerciseId === id) {
        const lastId: number = exercise.set.length;
        const newSet: ISet = {
          id: lastId + 1,
          reps: 0,
          weight: 0,
        };
        return {
          ...exercise,
          set: [...exercise.set, newSet],
        };
      }
      return exercise;
    });

    setExercises(updatedExercises);

    localStorage.setItem("addedExercise", JSON.stringify(updatedExercises));
  };

  const deleteExercise = (id: string) => {
    const updatedExercises = exercises.filter(
      (exercise) => exercise.exerciseId !== id
    );

    setExercises(updatedExercises);
    localStorage.setItem("addedExercise", JSON.stringify(updatedExercises));
  };

  const deleteSet = (exerciseId: string, set: ISet) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.exerciseId === exerciseId) {
        const updatedSets = exercise.set.filter((s) => s.id !== set.id);
        return {
          ...exercise,
          set: updatedSets,
        };
      }
      return exercise;
    });

    setExercises(updatedExercises);
    localStorage.setItem("addedExercise", JSON.stringify(updatedExercises));
  };

  const handleSaveWorkout = () => {
    console.log(exercises);
    const configuration = {
      method: "post",
      url: `https://weightwin-backend.vercel.app/user/workouts`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        exercises: exercises,
        planned: true,
      },
    };

    axios(configuration)
      .then(() => {
        alert("Workout added to planned workouts!");
      })
      .catch(() => {
        throw new Error();
      });

    localStorage.removeItem("addedExercise");
  };

  const handleRepChange = (id: number, value: number, exerciseId: string) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.exerciseId === exerciseId) {
        const updatedSets = exercise.set.map((set) => {
          if (set.id === id) {
            return {
              ...set,
              reps: value,
            };
          }
          return set;
        });

        return {
          ...exercise,
          set: updatedSets,
        };
      }
      return exercise;
    });
    setExercises(updatedExercises);
    localStorage.setItem("addedExercise", JSON.stringify(updatedExercises));
  };

  const handleWeightChange = (
    id: number,
    value: number,
    exerciseId: string
  ) => {
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.exerciseId === exerciseId) {
        const updatedSets = exercise.set.map((set) => {
          if (set.id === id) {
            return {
              ...set,
              weight: value,
            };
          }
          return set;
        });

        return {
          ...exercise,
          set: updatedSets,
        };
      }
      return exercise;
    });

    setExercises(updatedExercises);
    localStorage.setItem("addedExercise", JSON.stringify(updatedExercises));
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
                    handleRepChange(
                      set.id,
                      Number(e.target.value),
                      exercise.exerciseId
                    )
                  }
                />
                <input
                  value={set.weight}
                  name="weight"
                  className="set-weight"
                  placeholder={`${set.weight} kg`}
                  onChange={(e) =>
                    handleWeightChange(
                      set.id,
                      Number(e.target.value),
                      exercise.exerciseId
                    )
                  }
                />
                <span
                  className="material-symbols-outlined"
                  onClick={() => deleteSet(exercise.exerciseId, set)}
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
