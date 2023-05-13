import { FastifyPluginCallback } from "fastify";
import { loginUserHandler, logoutUserHandler, registerUserHandler } from "./user.controller";
import { LoginUserRequestType, RegisterUserRequestType } from "./types";
import { DefaultResponse } from "../../utils/response";

export const userRouter: FastifyPluginCallback = (app, opts, done) => {
	app.post<RegisterUserRequestType>("/register", {
		handler: registerUserHandler,
		schema: {
			description: "Регистрация пользователя",
			body: {
				type: "object",
				required: ["email", "login"],
				properties: {
					email: { type: "string" },
					login: { type: "string" }
				},
			},
			response: {
				200: DefaultResponse({ statusCode: 200, data: "User registration successful completed", error: null }),
				400: DefaultResponse({ statusCode: 400, data: null, error: "User registration failed" }),
				500: DefaultResponse({ statusCode: 500, data: null, error: "Server Error" }),
			},
		}
	});

	app.post<LoginUserRequestType>("/login", {
		handler: loginUserHandler,
		schema: {
			description: "Авторизация пользователя по паролю и почте",
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
				500: DefaultResponse({ statusCode: 500, data: null, error: "Server Error" })
			}
		}
	});

	app.post("/logout", logoutUserHandler)

	done();
};

