import { useEffect, useState } from "react";
import "../style/Home.scss";
import "../style/Settings.scss";
import "../style/Statistics.scss";
import { HeaderStyled } from "../styled-components/HeaderStyled";
import { IUser, defaultUser } from "../models/IUser";
import { useNavigate } from "react-router-dom";
import { ButtonStyled } from "../styled-components/ButtonStyled";
import axios from "axios";
import { IRecordOrHistory } from "../models/IRecordOrHistory";

export const Statistics = () => {
  const [user, setUser] = useState<IUser>(defaultUser);
  const [token, setToken] = useState("");
  const [records, setRecords] = useState<IRecordOrHistory[]>([]);
  const [history, setHistory] = useState<IRecordOrHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showRecords, setShowRecords] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);

    const foundToken = localStorage.getItem("token") || "";
    setToken(foundToken);
  }, []);

  const handleShowHistory = () => {
    if (showHistory === false) {
      setShowHistory(true);
      getHistoryData();
    } else {
      setShowHistory(false);
      setHistory([]);
    }
  };

  const handleShowRecords = () => {
    if (showRecords === false) {
      setShowRecords(true);
      getRecordData();
    } else {
      setShowRecords(false);
      setRecords([]);
    }
  };

  const getHistoryData = () => {
    const configuration = {
      method: "get",
      url: `https://weightwin-backend.vercel.app/${user._id}/history`,
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(configuration)
      .then((result) => {
        setHistory(result.data);
      })
      .catch(() => {
        throw new Error();
      });
  };

  const getRecordData = () => {
    const configuration = {
      method: "get",
      url: `https://weightwin-backend.vercel.app/user/${user._id}/record`,
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(configuration)
      .then((result) => {
        setRecords(result.data);
      })
      .catch(() => {
        throw new Error();
      });
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  const historyToShow = history.map((hist) => {
    return (
      <div key={hist._id} className="set">
        <div className="info">
          <h3>Exercise</h3>
          <p>{hist.exerciseName}</p>
        </div>
        <div className="info">
          <h3>Reps</h3>
          <p>{hist.reps}</p>
        </div>
        <div className="info">
          <h3>Weight</h3>
          <p>{hist.weight}</p>
        </div>
      </div>
    );
  });

  const recordsToShow = records.map((rec) => {
    return (
      <div key={rec._id} className="set">
        <div className="info">
          <h3>Exercise</h3>
          <p>{rec.exerciseName}</p>
        </div>
        <div className="info">
          <h3>Reps</h3>
          <p>{rec.reps}</p>
        </div>
        <div className="info">
          <h3>Weight</h3>
          <p>{rec.weight}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <HeaderStyled>
        <h2>Hi, {user.username}!</h2>
      </HeaderStyled>
      <div className="statistics-container">
        <ButtonStyled
          className="go-back-btn"
          onClick={() => handleBackToHome()}
        >
          Back to home page
        </ButtonStyled>
        <div className="records">
          <ButtonStyled
            id="record"
            className="history-record-btn"
            onClick={() => {
              handleShowRecords();
            }}
          >
            Show records
          </ButtonStyled>
          {recordsToShow}
        </div>
        <div className="history">
          <ButtonStyled
            className="history-record-btn"
            onClick={() => {
              handleShowHistory();
            }}
          >
            Show history
          </ButtonStyled>
          {historyToShow}
        </div>
      </div>
    </>
  );
};
