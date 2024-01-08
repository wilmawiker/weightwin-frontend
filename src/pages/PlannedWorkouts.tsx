import { useEffect, useState } from "react";
import { IWorkout } from "../models/IWorkout";
import { IUser, defaultUser } from "../models/IUser";
import axios from "axios";

export const PlannedWorkouts = () => {
  const [plannedWorkouts, setPlannedWorkouts] = useState<IWorkout[]>([]);
  const [user, setUser] = useState<IUser>(defaultUser);

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(foundUser);
  }, []);

  const getPlannedWorkouts = () => {
    const configuration = {
      method: "get",
      url: `http://localhost:3000/user/${user._id}/planned-workouts`,
    };

    axios(configuration)
      .then((result) => {
        setPlannedWorkouts(result.data.data);
        localStorage.setItem(
          "listOfExercises",
          JSON.stringify(result.data.data)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <></>;
};
