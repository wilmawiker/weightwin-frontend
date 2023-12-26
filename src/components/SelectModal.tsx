import "../style/Modal.scss";
import { UlStyled } from "../styled-components/UlStyled";

interface IModalProps {
  show: boolean;
  onClose: () => void;
}

const exercises = [
  { name: "Bench press", _id: 1 },
  { name: "Deadlift", _id: 2 },
];

export const SelectModal = (props: IModalProps) => {
  if (!props.show) {
    return null;
  }

  const exercisesToShow = exercises.map((exercise) => {
    return <li key={exercise._id}>{exercise.name}</li>;
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
