import { useEffect, useState } from "react";
import "../style/TrackWorkout.scss";
import { SelectModal } from "../components/SelectModal";
import { Link } from "react-router-dom";

interface ISet {
  id: number;
  reps: number;
  weight: number;
}
interface IExercise {
  name: string;
  _id: number;
  set: ISet[];
}

export const TrackWorkout = () => {
  const [show, setShow] = useState(false);
  const [exercises, setExercises] = useState<IExercise[]>([]);

  useEffect(() => {
    setExercises([
      {
        name: "Bench Press",
        _id: 1,
        set: [
          { id: 1, reps: 5, weight: 110 },
          { id: 2, reps: 5, weight: 115 },
        ],
      },
      {
        name: "Deadlift",
        _id: 2,
        set: [
          { id: 1, reps: 5, weight: 110 },
          { id: 2, reps: 5, weight: 115 },
        ],
      },
    ]);
  }, []);

  const addSet = (exercise: IExercise) => {
    const lastElement = exercise.set.slice(-1);
    console.log(lastElement);
    let newId = lastElement[0].id;
    newId = newId + 1;

    exercise.set.push({
      id: newId,
      reps: 0,
      weight: 0,
    });

    setExercises([...exercises, exercise]);
    console.log(exercises);
  };

  const deleteSet = (exercise: IExercise, set: ISet) => {
    const i = exercise.set.indexOf(set);
    exercise.set.splice(i, 1);

    setExercises([...exercises, exercise]);
    console.log(exercises);
  };

  const showExercises = exercises.map((exercise) => {
    return (
      <div className="exercise" key={exercise._id}>
        <div className="exercise-header">
          <p>{exercise.name}</p>
          <span className="material-symbols-outlined">cancel</span>
        </div>
        <div className="exercise-container">
          {exercise.set.map((set) => {
            return (
              <div className="set" key={set.id}>
                <div className="set-id">{set.id}</div>
                <div className="set-rep">{set.reps} reps</div>
                <div className="set-weight">{set.weight} kg</div>
                <span
                  className="material-symbols-outlined"
                  onClick={() => deleteSet(exercise, set)}
                >
                  delete
                </span>
              </div>
            );
          })}
          <div className="add-set" onClick={() => addSet(exercise)}>
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
          <span className="material-symbols-outlined">done</span>
        </Link>
      </header>
      <div className="main-content">
        <div className="add-btn" onClick={() => setShow(true)}>
          <p>Add exercise</p>
        </div>
        <SelectModal onClose={() => setShow(false)} show={show} />
        <div className="exercises">{showExercises}</div>
      </div>
    </>
  );
};
