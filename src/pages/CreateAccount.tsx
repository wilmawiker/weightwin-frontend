import "../style/Login.scss";
import WeightWinLogo from "../assets/weightwin-logo.svg";
import { InputStyled } from "../styled-components/InputStyled";
import { Link, useNavigate } from "react-router-dom";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { PStyled } from "../styled-components/PStyled";
import { SelectStyled } from "../styled-components/SelectStyled";
import moment from "moment";
import { useState } from "react";
import axios from "axios";

export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const configuration = {
      method: "post",
      url: "https://weightwin-backend.vercel.app/auth/register",
      data: {
        email,
        username,
        gender,
        dateOfBirth,
        password,
      },
    };

    axios(configuration)
      .then(() => {
        alert("User registrered!");
      })
      .catch(() => {
        throw new Error();
      });

    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={WeightWinLogo} alt="logo" />
        </div>
        <div className="login-form">
          <InputStyled
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          ></InputStyled>
          <InputStyled
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          ></InputStyled>
          <SelectStyled
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </SelectStyled>
          <InputStyled
            name="dateOfBirth"
            placeholder="Birthdate"
            type="date"
            max={moment().format("YYYY-MM-DD")}
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
            required
          ></InputStyled>
          <InputStyled
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></InputStyled>
          <div className="btn-and-link">
            <ButtonStyled type="submit" onClick={() => handleSubmit()}>
              Create account
            </ButtonStyled>
            <Link to="/">
              <PStyled>or Log in</PStyled>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
