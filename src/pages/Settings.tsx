import "../style/Settings.scss";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import { useEffect, useState } from "react";
import { InputStyled } from "../styled-components/InputStyled";
import { SelectStyled } from "../styled-components/SelectStyled";
import moment from "moment";
import { FooterStyled } from "../styled-components/FooterStyled";
import { IUser, defaultUser } from "../models/IUser";
import { useNavigate } from "react-router";
import axios from "axios";

export const Settings = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<IUser>(defaultUser);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);

    const foundToken = localStorage.getItem("token") || "";
    setToken(foundToken);
  }, []);

  const handleLogout = () => {
    setUser(defaultUser);
    localStorage.clear();
    navigate("/");
  };

  const handleSaveInformation = () => {
    const userId = user._id;
    const configuration = {
      method: "put",
      url: `http://localhost:3000/user/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        email,
        username,
        gender,
        dateOfBirth,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setUser(result.data);
        localStorage.setItem("user", JSON.stringify(result.data));
        alert("User updated");
      })
      .catch(() => {
        throw new Error();
      });
    setShow(false);
  };

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <>
      <HeaderStyled>
        <h2>Hi, {user.username}!</h2>
        <button className="logout-btn" onClick={() => handleLogout()}>
          <span className="material-symbols-outlined">logout</span>
          <p>Log out</p>
        </button>
      </HeaderStyled>
      <div className="home-container">
        <ButtonStyled className="go-back-btn" onClick={() => handleClick()}>
          Back to home page
        </ButtonStyled>
        <div className="information">
          {!show ? (
            <>
              <div>
                <label htmlFor="username">Username:</label>
                <h2 id="username">{user.username}</h2>
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <p id="email">{user.email}</p>
              </div>
              <p>******</p>
              <div>
                <label htmlFor="gender">Gender:</label>
                <p>{user.gender}</p>
              </div>
              <div>
                <label htmlFor="dateOfBirth">Date of birth:</label>
                <p id="dateOfBirth">{user.dateOfBirth}</p>
              </div>
              <ButtonStyled
                className="information-btn"
                onClick={() => setShow(true)}
              >
                Change information
              </ButtonStyled>
            </>
          ) : (
            <>
              <label htmlFor="username">Username:</label>
              <InputStyled
                id="username"
                name="username"
                value={username}
                placeholder={user.username}
                onChange={(e) => setUsername(e.target.value)}
              ></InputStyled>
              <label htmlFor="email">Email:</label>
              <InputStyled
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email}
              ></InputStyled>
              <label htmlFor="password">Password:</label>
              <InputStyled
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              ></InputStyled>
              <label htmlFor="gender">Gender:</label>
              <SelectStyled
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </SelectStyled>
              <label htmlFor="dateOfBirth">Date of birth:</label>
              <InputStyled
                id="dateOfBirth"
                name="dateOfBirth"
                value={dateOfBirth}
                placeholder={user.dateOfBirth}
                type="date"
                max={moment().format("YYYY-MM-DD")}
                onChange={(e) => setDateOfBirth(e.target.value)}
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
                  onClick={() => handleSaveInformation()}
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
