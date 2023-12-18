import { Link } from "react-router-dom";
import "../style/Home.scss";
import { HeaderStyled } from "../styled-components/HeaderStyled";

export const Settings = () => {
  return (
    <>
      <HeaderStyled>
        <h2>Hi, Name!</h2>
        <Link to="/">
          <span className="material-symbols-outlined">logout</span>
          <p>Log out</p>
        </Link>
      </HeaderStyled>
      <div className="home-container"></div>
    </>
  );
};
