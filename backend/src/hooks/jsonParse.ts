import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const jsonParse = (
	request: FastifyRequest, 
	reply: FastifyReply,
	done: HookHandlerDoneFunction
) => {
	request.headers['Content-Type'] = 'application/json';
	done();
}