import { FastifyReply, FastifyRequest } from "fastify";
import { ICreatePostArgs, createPost, deletePostById, getPostById, getPostsByAuthorId, updatePost } from "./post.service";
import { Response } from "../../utils/response";
import { ServerError } from "../../errors";
import jwt from "jsonwebtoken";

interface ICreatePostHandlerBody {
	Body: ICreatePostArgs
}

export const createPostHandler = async (
	request: FastifyRequest<ICreatePostHandlerBody>,
	reply: FastifyReply
) => {
	const savedPost = await createPost({
		authorId: request.body?.authorId,
		postData: request.body?.postData
	});

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
	request: FastifyRequest<{ Headers: { authorization: string } }>,
	reply: FastifyReply
) => {
	let authorEmail: string = "orvysegor@gmail.com";

	try {
		const token = request.headers?.authorization?.split("Bearer ")[1] || null;
		const tokenData = jwt.verify(
			String(token), 
			String(process.env.SECRET_KEY)
		);

		console.log(tokenData);
	} catch {
		throw new ServerError("token verification failed");
	}

	const posts = await getPostsByAuthorId(authorEmail);

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