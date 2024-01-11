import { useEffect, useState } from "react";
import "../style/Modal.scss";
import { UlStyled } from "../styled-components/UlStyled";
import { IExercise } from "../models/IExercise";
import { IExerciseToAdd } from "../models/IWorkout";
import axios from "axios";

interface IModalProps {
  show: boolean;
  onClose: () => void;
}

export const SelectModal = (props: IModalProps) => {
  const [listOfExercises, setListOfExercises] = useState<IExercise[]>([]);
  const addedExercises: IExerciseToAdd[] = JSON.parse(
    localStorage.getItem("addedExercise") || "[]"
  );
  useEffect(() => {
    const configuration = {
      method: "get",
      url: "https://weightwin-backend.vercel.app/exercises",
    };

    axios(configuration)
      .then((result) => {
        setListOfExercises(result.data.data);
        localStorage.setItem(
          "listOfExercises",
          JSON.stringify(result.data.data)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!props.show) {
    return null;
  }

  const handleClick = (nameOfExercise: string, exerciseId: string) => {
    const exerciseToAdd: IExerciseToAdd = {
      name: nameOfExercise,
      exerciseId: exerciseId,
      set: [
        {
          id: 1,
          reps: 0,
          weight: 0,
        },
      ],
    };
    addedExercises.push(exerciseToAdd);
    localStorage.setItem("addedExercise", JSON.stringify(addedExercises));
    props.onClose();
  };

  const exercisesToShow = listOfExercises.map((exercise) => {
    return (
      <li
        key={exercise._id}
        onClick={() => {
          handleClick(exercise.name, exercise._id);
        }}
      >
        {exercise.name}
      </li>
    );
  });

  return (
    <>
      <div className="modal-overlay" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <span className="material-symbols-outlined" onClick={props.onClose}>
              cancel
            </span>
          </div>
          <div className="modal-main">
            <UlStyled>{exercisesToShow}</UlStyled>
          </div>
        </div>
      </div>
    </>
  );
};
