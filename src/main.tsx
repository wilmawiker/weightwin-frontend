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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
