interface IFormState {
  email: string | null;
  password: string | null;
}

interface ILoginData {
  data: {
    data: {
      token: string;
    } | null;
    statusCode: number;
    error: string | null;
  };
}

export type { IFormState, ILoginData };
