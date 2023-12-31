export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
}

export const defaultUser: IUser = {
  _id: "",
  username: "",
  email: "",
  password: "",
  gender: "",
  dateOfBirth: "",
};
