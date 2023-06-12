import { CustomError, ServerError } from "../../errors";
import { Post } from "../../database/schemas/post.schema";
import { IPost } from "./types";

export interface ICreatePostArgs {
	authorId: string;
	postData: {
		title: string,
		content: string,
	},
}

export interface IUpdataPostArgs {
	postId: string
	data: {
		title: string,
		content: string
	},
}

export const createPost = async ({ postData, authorId }: ICreatePostArgs): Promise<IPost | Error> => {
	const post = await Post.create({
		title: postData.title,
        content: postData.content,
		createAt: Date(),
        authorId,
	});

	return post.toJSON();
};

export const getPostsByAuthorId = async (authorId: string): Promise<IPost[] | Error> => {
	const posts = await Post.find({ authorId, deleteAt: "null" });

	return posts;
};

export const getPostById = async (postId: string): Promise<IPost | Error> => {
	const post = await Post.findOne({ postId, deleteAt: "null" });

	if (post === null) {
		throw new CustomError(`Post with ID ${postId} cannot be found`, 400); 
	}

	return post;
};

export const updatePost = async ({ data, postId }:  IUpdataPostArgs): Promise<IPost | Error> => {
	const post = await Post.findByIdAndUpdate(postId, { ...data });

	if (post === null) {
		throw new CustomError(`Post with ID ${postId} cannot be updated`, 400); 
    }

	return post;
};

export const deletePostById = async (postId: string): Promise<IPost | Error> => {
	const post = await Post.findOneAndUpdate({ _id: postId, deleteAt: "null" }, { deleteAt: Date() });

	if (post === null) {
		throw new CustomError(`Post with ID ${postId} cannot be deleted`, 400);
	}

	return post;
};