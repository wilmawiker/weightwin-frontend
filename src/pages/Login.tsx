import "../style/Login.scss";
import WeightWinLogo from "../assets/weightwin-logo.svg";
import { InputStyled } from "../styled-components/InputStyled";
import { Link } from "react-router-dom";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { PStyled } from "../styled-components/PStyled";
import { useState } from "react";
import axios from "axios";
import { IUser, defaultUser } from "../models/IUser";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<IUser>(defaultUser);

  const handleSubmit = () => {
    const configuration = {
      method: "post",
      url: "http://localhost:3000/auth/login",
      data: {
        username,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log(result.data);
        setUser(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={WeightWinLogo} alt="logo" />
        </div>
        <form className="login-form" onSubmit={() => handleSubmit()}>
          <InputStyled
            value={username}
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></InputStyled>
          <InputStyled
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></InputStyled>
          <div className="btn-and-link">
            <Link to="/home">
              <ButtonStyled onClick={() => handleSubmit()}>Log in</ButtonStyled>
            </Link>
            <Link to="/create-account">
              <PStyled>or Create Account</PStyled>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
