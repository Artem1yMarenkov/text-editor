import { FastifyPluginCallback } from "fastify";
import { loginUserHandler, logoutUserHandler, registerUserHandler } from "./user.controller";

export const userRouter: FastifyPluginCallback = (app, opts, done) => {
	app.post(
		"/register", 
		{
			schema: {
				querystring: {
					login: { type: "string" },
					email: { type: "string" }
				}
			}
		}, 
		registerUserHandler
	);

	app.post(
		"/login",
		{
			schema: {
				querystring: {
					email: { type: "string" },
					password: { type: "string" }
				}
			}
		},
		loginUserHandler
	);

	app.post(
		"/logout",
		logoutUserHandler
	)

	done();
};

