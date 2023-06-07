import { IUser } from "./types";
import { User } from "../../database/schemas/user.schema";
import { CustomError } from "../../errors";

export const createUser = async (login: string, email: string, password: string): Promise<IUser | null> => {
	try {
		const user = new User({ email, login, password });
		return await user.save();
	} catch (e) {
		console.error(e);
		return null;
	};
};

export const loginUser = async (email: string, password: string): Promise<IUser | null> => {
	try {
		const user = await User.findOne({ email, password });

		if (user == null) {
			throw new Error("Invalid email or password");
		}

		return user;
	} catch (e) {
		console.error(e);

		return null;
	}
};

export const updateUser = async (data: IUser): Promise<IUser | Error> => {
	const user = await User.findByIdAndUpdate(data._id, {
		email: data.email,
		login: data.login,
		password: data.password
	});

	if (user == null) {
		throw new CustomError(`Cannot update User with ID ${data._id}`, 400);
	} 

	return user;
};