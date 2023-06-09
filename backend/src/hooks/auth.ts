import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { CustomError } from "../errors";
import jwt from "jsonwebtoken";

import * as dotenv from 'dotenv';
dotenv.config();

interface IAuthMiddlewareRequest {
	Headers: {
		authorization: string;
	}
}

interface IVerifyTokenPayload {
	email: string,
	_id: string,
	iat: number,
	exp: number
}

const allowedPaths = ['/register', '/login', '/docs'];

export const authCheck = (
	request: FastifyRequest<IAuthMiddlewareRequest>, 
	reply: FastifyReply,
	done: HookHandlerDoneFunction
) => {
	const path = request.routerPath;
	
	if (typeof path == "undefined") {
		throw new CustomError("Path does not exist", 403);
	}

	const token = request.headers?.authorization?.split("Bearer ")[1];

	const isAllowedPath = allowedPaths.some(item => path.includes(item));

	if (isAllowedPath) {
		return done();
	}

	if (!token) {
		throw new CustomError("Invalid Token", 401);
	}

	const verify = jwt.verify(token, String(process.env?.SECRET_KEY)) as IVerifyTokenPayload | null;
	
	if (!verify) {
		throw new CustomError("Verify Token Error", 401);
	}

	const { email, _id } = verify;
	
	if (!email || !_id) {
		throw new CustomError("Invalid Token Data", 401);
	}

	request.User = { email, _id }

	done();
};