import "../style/Login.scss";
import WeightWinLogo from "../assets/weightwin-logo.svg";
import { InputStyled } from "../styled-components/InputStyled";
import { Link, Navigate } from "react-router-dom";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { PStyled } from "../styled-components/PStyled";
import { useEffect, useState } from "react";
import axios from "axios";
import { IUser, defaultUser } from "../models/IUser";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<IUser>(defaultUser);
  const [validationMsg, setValidationMsg] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  if (user.username != "") {
    return <Navigate to="/home"></Navigate>;
  }

  const handleLogin = () => {
    const configuration = {
      method: "post",
      url: "https://weightwin-backend.vercel.app/auth/login",
      data: {
        username,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setUser(result.data.data);
        localStorage.setItem("user", JSON.stringify(result.data.data));
        localStorage.setItem("token", result.data.token);
      })
      .catch((error) => {
        setValidationMsg("Invalid log in credentials");
        console.log(error);
      });
    return <Navigate to="/home"></Navigate>;
  };

  return (
    <>
      <div className="login-container">
        <div className="logo">
          <img src={WeightWinLogo} alt="logo" />
        </div>
        <div className="login-form">
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
          <p>{validationMsg}</p>
          <div className="btn-and-link">
            <ButtonStyled onClick={() => handleLogin()}>Log in</ButtonStyled>
            <Link to="/create-account">
              <PStyled>or Create Account</PStyled>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
