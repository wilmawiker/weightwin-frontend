import { useNavigate } from "react-router-dom";
import "../style/Home.scss";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { FooterStyled } from "../styled-components/FooterStyled";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { IUser, defaultUser } from "../models/IUser";
import axios from "axios";

export const Home = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<IUser>(defaultUser);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);

    const foundToken = localStorage.getItem("token") || "";
    setToken(foundToken);
  }, []);

  const handleShowSettings = () => {
    navigate("/settings");
  };

  const handleShowStatistics = () => {
    navigate("/statistics");
  };

  const handleShowExercises = () => {
    const configuration = {
      method: "get",
      url: "https://weightwin-backend.vercel.app/exercises",
    };

    axios(configuration)
      .then((result) => {
        localStorage.setItem(
          "listOfExercises",
          JSON.stringify(result.data.data)
        );
        navigate("/exercises");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowPlanned = () => {
    const configuration = {
      method: "get",
      url: `https://weightwin-backend.vercel.app/user/${user._id}/planned-workouts`,
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(configuration)
      .then((result) => {
        localStorage.setItem("planned-workouts", JSON.stringify(result.data));
        navigate("/planned-workouts");
      })
      .catch(() => {
        throw new Error();
      });
  };

  return (
    <>
      <HeaderStyled>
        <h2>Hi, {user.username}!</h2>
        <button className="login-btn" onClick={() => handleShowSettings()}>
          <span className="material-symbols-outlined">Settings</span>
          <p>Settings</p>
        </button>
      </HeaderStyled>
      <div className="home-container">
        <div className="home-btn" onClick={() => setShow(true)}>
          <span className="material-symbols-outlined">Add</span>
          <p>Workout</p>
        </div>
        <Modal onClose={() => setShow(false)} show={show} />
        <div className="home-btn" onClick={() => handleShowExercises()}>
          <span className="material-symbols-outlined">fitness_center</span>
          <p>Exercises</p>
        </div>
        <div className="home-btn" onClick={() => handleShowStatistics()}>
          <span className="material-symbols-outlined">show_chart</span>
          <p>Statistics</p>
        </div>
        <div className="home-btn" onClick={() => handleShowPlanned()}>
          <span className="material-symbols-outlined">calendar_month</span>
          <p>Planned workouts</p>
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
