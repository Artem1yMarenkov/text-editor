export type IUser = {
	login: string;
	email: string;
	password: string;
	_id: string;
}

export type RegisterUserRequestType = {
	Body: {
		login: string,
		email: string
	}
}

export type LoginUserRequestType = {
	Body: {
		password: string,
		email: string
	}
}