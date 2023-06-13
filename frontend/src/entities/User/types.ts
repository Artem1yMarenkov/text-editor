interface IRegisterFormState {
  email: string | null;
  login: string | null;
}

interface ILoginFormState {
  email: string | null;
  password: string | null;
}

interface ILoginData {
  data: {
    token: string;
  };
  statusCode: number;
  error: string | null;
}

interface IUser {
  _id: string;
  login: string;
  email: string;
  password: string;
}

export type { IRegisterFormState, ILoginFormState, ILoginData, IUser };
