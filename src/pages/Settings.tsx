import { Link } from "react-router-dom";
import "../style/Settings.scss";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { useState } from "react";
import { InputStyled } from "../styled-components/InputStyled";
import { SelectStyled } from "../styled-components/SelectStyled";
import moment from "moment";
import { FooterStyled } from "../styled-components/FooterStyled";

export const Settings = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <HeaderStyled>
        <h2>Hi, Name!</h2>
        <Link to="/">
          <span className="material-symbols-outlined">logout</span>
          <p>Log out</p>
        </Link>
      </HeaderStyled>
      <div className="home-container">
        <div className="information">
          {!show ? (
            <>
              <h2>Username</h2>
              <p>Email</p>
              <p>******</p>
              <p>Gender</p>
              <p>Date of birth</p>
              <ButtonStyled
                className="information-btn"
                onClick={() => setShow(true)}
              >
                Change information
              </ButtonStyled>
            </>
          ) : (
            <>
              <InputStyled placeholder="Username"></InputStyled>
              <InputStyled placeholder="Email"></InputStyled>
              <InputStyled placeholder="Password" type="password"></InputStyled>
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
              <div className="btn-container">
                <ButtonStyled
                  className="cancel-btn"
                  onClick={() => setShow(false)}
                >
                  Cancel
                </ButtonStyled>
                <ButtonStyled
                  className="save-btn"
                  onClick={() => setShow(false)}
                >
                  Save changes
                </ButtonStyled>
              </div>
            </>
          )}
        </div>
      </div>
      <FooterStyled />
    </>
  );
};
