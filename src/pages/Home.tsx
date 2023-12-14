import { Link } from "react-router-dom";
import "../style/Home.scss";
import { HeaderStyled } from "../styled components/HeaderStyled";
export const Home = () => {
  return (
    <>
      <HeaderStyled>
        <h2>Hi, Name!</h2>
        <Link to="/settings">
          <span className="material-symbols-outlined">Settings</span>
          <p>Settings</p>
        </Link>
      </HeaderStyled>
    </>
  );
};
