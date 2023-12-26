import { createContext } from "react";
import { IUser, defaultUser } from "../models/IUser";
export const UserContext = createContext<IUser>(defaultUser);
