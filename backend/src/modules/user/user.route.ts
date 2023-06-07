import { FastifyPluginCallback } from "fastify";
import { loginUserHandler, logoutUserHandler, registerUserHandler } from "./user.controller";
import { LoginUserRequestType, RegisterUserRequestType } from "./types";
import { Response } from "../../utils/response";

export const userRouter: FastifyPluginCallback = (app, opts, done) => {
	app.post<RegisterUserRequestType>("/register", {
		handler: registerUserHandler,
		schema: {
			description: "Регистрация пользователя",
			tags: ["user"],
			body: {
				type: "object",
				required: ["email", "login"],
				properties: {
					email: { type: "string" },
					login: { type: "string" }
				},
			},
			response: {
				200: new Response({ statusCode: 200, data: "User registration successful completed", error: null }, true).schema,
				400: new Response({ statusCode: 400, data: null, error: "User registration failed" }, true).schema,
				500: new Response({ statusCode: 500, data: null, error: "Server Error" }, true).schema,
			},
		}
	});

	app.post<LoginUserRequestType>("/login", {
		handler: loginUserHandler,
		schema: {
			description: "Авторизация пользователя по паролю и почте",
			tags: ["user"],
			body: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: { type: "string" },
					password: { type: "string" }
				}
			},
			response: {
				200: {
					required: ["data", "statusCode", "error"],
					properties: { 
						data: { 
							type: "object", 
							properties: {
								token: {
									type: "string"
								}
							}
						}, 
						statusCode: {
							default: 200
						}, 
						error: {
							default: null
						} 
					}
				},
				400: {
					required: ["data", "statusCode", "error"],
					properties: { 
						data: {
							default: null
						}, 
						statusCode: {
							default: 400
						}, 
						error: {
							type: "string"
						} 
					}
				},
				500: new Response({ statusCode: 500, data: null, error: "Server Error" }, false).schema
			}
		}
	});

	app.post("/logout", {
		handler: logoutUserHandler,
		schema : {
			tags: ["user"]
		}
	})

	done();
};

