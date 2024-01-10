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
import { isValidEmail } from "../services/isValidEmail";

export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isValidEmail(email)) {
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
          navigate("/");
        })
        .catch(() => {
          setValidationMsg("All fields are required!");
          throw new Error();
        });
    } else {
      setValidationMsg("Email must be a valid address!");
    }
  };

  return (
    <>
      <div className="login-container">
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
          <p>{validationMsg}</p>
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
