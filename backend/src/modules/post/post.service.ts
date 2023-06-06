import { CustomError, ServerError } from "../../errors";
import { Post } from "../../database/schemas/post.schema";
import { IPost } from "./types";

export interface ICreatePostArgs {
	authorId: string
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
	try {
		const post = await Post.create({
			title: postData.title,
	        content: postData.content,
			createAt: Date(),
	        authorId,
		});

		return post.toJSON();
	} catch (error) {
		throw new ServerError("Post creation failed");
	}
};

export const getPostsByAuthorId = async (authorId: string): Promise<IPost[] | Error> => {
	try {
		const posts = await Post.find({ email: authorId });

		if (posts.length == 0) {
			throw new CustomError(`Posts with AuthorID "${authorId}" not found`, 400);
		}

		return posts;
	} catch {
		throw new ServerError("Posts getByAuthorId failed");
	}
};

export const getPostById = async (postId: string): Promise<IPost | Error> => {
	try {
		const post = await Post.findById(postId);

		if (post === null) {
			throw new CustomError(`Post with ID ${postId} not found`, 400); 
		}

		return post;
	} catch {
		throw new ServerError("Post getById failed");
	}
};

export const updatePost = async ({ data, postId }:  IUpdataPostArgs): Promise<IPost | Error> => {
	try {
		const post = await Post.findOneAndReplace({ _id: postId }, { data });

		if (post === null) {
			throw new CustomError(`Post with ID ${postId} not found`, 400); 
        }

		return post;
	} catch {
		throw new ServerError("Post update failed");
	}
};

export const deletePostById = async (postId: string): Promise<IPost | Error> => {
	try {
		const post = await Post.findByIdAndUpdate({ _id: postId, deletedAt: null }, { deletedAt: Date() });

		if (post === null) {
			throw new CustomError(`Post with ID ${postId} not found`, 400);
		}

		return post;
	} catch {
		throw new ServerError("Post delete failed");
	}
};