import { FastifyInstance } from "fastify";
import { postRouter } from "./post/post.router";
import { userRouter } from "./user/user.route";

export const setRoutes = (app: FastifyInstance) => {
	app.register(userRouter, { prefix: "/user" });
	app.register(postRouter, { prefix: "/post" })
};