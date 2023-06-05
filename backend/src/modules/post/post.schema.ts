import { Schema, model } from "mongoose";
import { IPost } from "./types";

const postSchema = new Schema<IPost>({
	title: { type: "string", required: true },
	content: { type: "string" },
	authorId: { type: "string", required: true },
	deleteAt: { type: "string" }
});

export const Post = model<IPost>("Post", postSchema);