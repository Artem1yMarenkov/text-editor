import { Schema, model } from "mongoose";
import { IUser } from "../../modules/user/types";

const userSchema = new Schema<IUser>({
	login: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
}, { versionKey: false });

export const User = model<IUser>("User", userSchema);