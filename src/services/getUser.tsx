import axios from "axios";
import { IUser } from "../models/IUser";

export async function getUser() {
  const response = await axios.post<IUser>("http://localhost:3000/auth/login");
  return response.data;
}
