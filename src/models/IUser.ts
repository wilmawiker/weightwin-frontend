export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
}

export const defaultUser: IUser = {
  id: "",
  username: "",
  email: "",
  password: "",
  gender: "",
  dateOfBirth: "",
};
