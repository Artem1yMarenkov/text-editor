import { IUser } from "./types";
import { User } from "../../database/schemas/user.schema";

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
		console.log(email, password)
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