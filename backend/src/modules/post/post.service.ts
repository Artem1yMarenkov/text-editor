import { Post } from "./post.schema";
import { IPost } from "./types";

interface ICreatePostArgs {
	authorId: string
	postData: {
		title: string,
		content: string,
	},
}

interface IUpdataPost {
	postId: string
	data: {
		title: string,
		content: string
	},
}

export const createPost = async ({ postData, authorId }: ICreatePostArgs): Promise<IPost | null> => {
	try {
		const post = await Post.create({
			title: postData.title,
	        content: postData.content,
			createAt: Date(),
	        authorId,
		});

		return post;
	} catch {
		return null;
	}
};

export const getPostsByAuthorId = async (authorId: string): Promise<IPost[] | null> => {
	return null;
};

export const getPostById = async (postId: string): Promise<IPost | null> => {
	return null;
};

export const updatePost = async ({ data, postId }:  IUpdataPost): Promise<IPost | null> => {
	return null;
};

export const deletePostById = async (postId: string): Promise<IPost | null> => {
	return null;
};