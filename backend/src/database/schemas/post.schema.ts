import { Schema, model } from "mongoose";
import { IPost } from "../../modules/post/types";

const postSchema = new Schema<IPost>({
	title: { type: String },
	content: { type: String },
	authorId: { type: String, required: true },
	deleteAt: { type: String, default: "null" }
}, { versionKey: false });

export const Post = model<IPost>("Post", postSchema);