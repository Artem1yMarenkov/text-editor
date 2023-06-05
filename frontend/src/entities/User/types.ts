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
  
export type { 
	IRegisterFormState, 
	ILoginFormState, 
	ILoginData
};