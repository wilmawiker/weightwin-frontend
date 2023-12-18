import { Link } from "react-router-dom";
import "../style/Home.scss";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { FooterStyled } from "../styled-components/FooterStyled";
import { Modal } from "../components/Modal";
import { useState } from "react";
export const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <HeaderStyled>
        <h2>Hi, Name!</h2>
        <Link to="/settings">
          <span className="material-symbols-outlined">Settings</span>
          <p>Settings</p>
        </Link>
      </HeaderStyled>
      <div className="home-container">
        <div className="home-btn" onClick={() => setShow(true)}>
          <span className="material-symbols-outlined">Add</span>
          <p>Workout</p>
        </div>
        <Modal onClose={() => setShow(false)} show={show} />
        <div className="home-btn">
          <span className="material-symbols-outlined">fitness_center</span>
          <p>Exercises</p>
        </div>
        <div className="home-btn">
          <Link to="/statistic">
            <span className="material-symbols-outlined">show_chart</span>
            <p>Statistic</p>
          </Link>
        </div>
      </div>
      <FooterStyled>
        <h2>WeightWin</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero saepe
          esse illum exercitationem, culpa debitis voluptates eius nostrum
          dolores, ex numquam. Harum nostrum numquam odio veritatis ducimus
          error. Mollitia, delectus.
        </p>
      </FooterStyled>
    </>
  );
};
