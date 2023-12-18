import "../style/TrackWorkout.scss";

export const TrackWorkout = () => {
  return (
    <>
      <header className="proceed-or-cancel">
        <span className="material-symbols-outlined">cancel</span>
        <span className="material-symbols-outlined">done</span>
      </header>
      <div className="main-content">
        <div className="add-btn">
          <p>Add exercise</p>
        </div>

        <div className="exercises"></div>
      </div>
    </>
  );
};
