import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { CustomError } from "../errors";
import jwt from "jsonwebtoken";

import * as dotenv from 'dotenv';
dotenv.config();

interface IAuthMiddlewareRequest {
	Headers: {
		authorization: string;
	},
	User: { 
		_id: string, 
		email: string
	} | null
}

const allowedPaths = ['/register', '/login', '/docs'];

export const authMiddleware = (
	request: FastifyRequest<IAuthMiddlewareRequest>, 
	reply: FastifyReply,
	done: HookHandlerDoneFunction
) => {
	try {
		const path = request.routerPath;
		const token = request.headers?.authorization?.split("Bearer ")[1];

		const isAllowedPath = allowedPaths.some(item => path.includes(item));

		if (isAllowedPath) {
			return done();
		}

		if (!token) {
			throw new CustomError("Invalid Token", 403);
		}

		const verify = jwt.verify(token, String(process.env?.SECRET_KEY));

		done();
	} catch (err) {
		return reply.code(401).send({
			error: 'Unauthorized',
			statusCode: 403,
			data: null
		});
	}
};