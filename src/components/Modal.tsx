import { Link } from "react-router-dom";
import "../style/Modal.scss";

interface IModalProps {
  show: boolean;
  onClose: () => void;
}

export const Modal = (props: IModalProps) => {
  if (!props.show) {
    return null;
  }
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
            <div className="modal-btn">
              <Link to="/track-workout">
                <p>Start new workout</p>
              </Link>
            </div>
            <div className="modal-btn">
              <p>Plan workout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
