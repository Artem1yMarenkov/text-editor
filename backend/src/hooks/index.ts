import { FastifyInstance } from "fastify";
import { jsonParse } from "./jsonParse";
import { authCheck } from "./auth";

export const setHooks = (app: FastifyInstance) => {
	app.addHook("onRequest", jsonParse);
	app.addHook("preHandler", authCheck);
};