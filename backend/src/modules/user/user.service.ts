import { User } from "./user.schema";

export const createUser = async (login: string, email: string, password: string): Promise<void> => {
	try {
		const user = new User({ email, login, password });

		await user.save();
	} catch (e) {
		console.error(e);
	};
};

export const loginUser = async (email: string, password: string): Promise<boolean> => {
	try {
		const user = User.findOne({ email, password });

		if (user == null) {
			throw new Error();
		}

		return true;
	} catch (e) {
		console.error(e);

		return false;
	}
};