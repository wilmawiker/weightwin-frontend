import "../style/Login.scss";
import WeightWinLogo from "../assets/weightwin-logo.svg";
import { InputStyled } from "../styled-components/InputStyled";
import { Link } from "react-router-dom";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { PStyled } from "../styled-components/PStyled";
import { SelectStyled } from "../styled-components/SelectStyled";
import moment from "moment";

export const CreateAccount = () => {
  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={WeightWinLogo} alt="logo" />
        </div>
        <div className="login-form">
          <InputStyled placeholder="Email"></InputStyled>
          <InputStyled placeholder="Username"></InputStyled>
          <SelectStyled>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </SelectStyled>
          <InputStyled
            placeholder="Birthdate"
            type="date"
            max={moment().format("YYYY-MM-DD")}
          ></InputStyled>
          <InputStyled placeholder="Password" type="password"></InputStyled>
          <div className="btn-and-link">
            <Link to="/">
              <ButtonStyled>Create account</ButtonStyled>
            </Link>
            <Link to="/">
              <PStyled>or Log in</PStyled>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
