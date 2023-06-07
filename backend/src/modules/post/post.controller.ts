import { FastifyReply, FastifyRequest } from "fastify";
import { ICreatePostArgs, createPost, deletePostById, getPostById, getPostsByAuthorId, updatePost } from "./post.service";
import { Response } from "../../utils/response";


export const createPostHandler = async (
	request: FastifyRequest<{ Body: ICreatePostArgs }>,
	reply: FastifyReply
) => {
	const authorId = String(request.User?._id);
	const postData = request.body?.postData;

	const savedPost = await createPost({ authorId, postData });

	return reply.code(200).send(new Response({
		statusCode: 200,
		data: savedPost,
		error: null	
	}));
};

export const getPostByIdHandler = async (
	request: FastifyRequest<{ Params: { postId: string }}>,
    reply: FastifyReply
) => {
	const postId = request.params?.postId;

	const post = await getPostById(postId);

	return reply.code(200).send(new Response({
        statusCode: 200,
        data: post,
        error: null    
    }));
}

export const getPostsByAuthorIdHandler = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const authorId = request.User._id;

	console.log(authorId);
	
	const posts = await getPostsByAuthorId(authorId || "");

	return reply.code(200).send(new Response({
        statusCode: 200,
        data: posts,
        error: null    
    }));
};

export const deletePostHandler = async (
	request: FastifyRequest<{ Params: { postId: string }}>,
	reply: FastifyReply
) => {
	const postId = request.params?.postId;
	const post = await deletePostById(postId);

	return reply.code(200).send(new Response({
		statusCode: 200,
		data: post,
		error: null
	}))
};

export const updatePostHandler = async (
	request: FastifyRequest<{ Body: { data: { title: string; content: string }}, Params: { postId: string } }>,
    reply: FastifyReply
) => {
	const updatedPost = await updatePost({
		data: request.body.data,
		postId: request.params.postId
	});

	return reply.code(200).send(new Response({
		statusCode: 200,
		data: updatedPost,
		error: null
	}))
};