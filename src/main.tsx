import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { CreateAccount } from "./pages/CreateAccount";
import { Settings } from "./pages/Settings";
import { TrackWorkout } from "./pages/TrackWorkout";
import { Statistics } from "./pages/Statistics";
import { BrowseExercises } from "./pages/BrowseExercises";
import { PlannedWorkouts } from "./pages/PlannedWorkouts";
import { PlanWorkout } from "./pages/PlanWorkout";
import { WorkoutDetail } from "./pages/WorkoutDetail";
import { ExerciseDetails } from "./pages/ExerciseDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/create-account",
    element: <CreateAccount></CreateAccount>,
  },
  {
    path: "/settings",
    element: <Settings></Settings>,
  },
  {
    path: "/track-workout",
    element: <TrackWorkout></TrackWorkout>,
  },
  {
    path: "/plan-workout",
    element: <PlanWorkout></PlanWorkout>,
  },
  {
    path: "/planned-workouts",
    element: <PlannedWorkouts></PlannedWorkouts>,
  },
  {
    path: "/planned-workouts/:id",
    element: <WorkoutDetail></WorkoutDetail>,
  },
  {
    path: "/statistics",
    element: <Statistics></Statistics>,
  },
  {
    path: "/exercises",
    element: <BrowseExercises></BrowseExercises>,
  },
  {
    path: "/exercises/:id",
    element: <ExerciseDetails></ExerciseDetails>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
