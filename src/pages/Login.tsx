import "../style/Login.scss";
import WeightWinLogo from "../assets/weightwin-logo.svg";
import { InputStyled } from "../styled components/InputStyled";
import { Link } from "react-router-dom";
import { ButtonStyled } from "../styled components/ButtonStyled";
import { PStyled } from "../styled components/PStyled";

export const Login = () => {
  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={WeightWinLogo} alt="logo" />
        </div>
        <div className="login-form">
          <InputStyled placeholder="Email"></InputStyled>
          <InputStyled placeholder="Password" type="password"></InputStyled>
          <div className="btn-and-link">
            <Link to="/home">
              <ButtonStyled>Log in</ButtonStyled>
            </Link>
            <Link to="/create-account">
              <PStyled>or Create Account</PStyled>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
