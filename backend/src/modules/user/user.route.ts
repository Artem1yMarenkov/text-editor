import { FastifyPluginCallback } from "fastify";
import { getUserDataHandler, loginUserHandler, registerUserHandler, updateUserHandler } from "./user.controller";
import { LoginUserRequestType, RegisterUserRequestType } from "./types";
import { Response } from "../../utils/response";
import { GetUserDataSchema, UpdateUserSchema } from "./user.schemas";
import { StatusCodeSchema } from "../../shared/schemas";

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
				200: {
					type: "object",
					properties: {
						statusCode: { type: "number", default: 200 },
						data: "User registration completed successfully",
						error: { type: "object", default: null}
					},
				},
				400: {
					type: "object",
					properties: {
						statusCode: StatusCodeSchema,
						data: { type: "object", default: null },
						error: {
							type: "string",
							default: "User registration failed"
						}
					},
				},
				500: {
					type: "object",
					properties: {
						statusCode: StatusCodeSchema,
						data: { type: "object", default: null },
						error: {
							type: "string",
							default: "Server Error"
						}
					},
				},
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

	app.post("/update", {
		handler: updateUserHandler,
		schema: UpdateUserSchema
	})

	app.get("/info", {
		handler: getUserDataHandler,
		schema: GetUserDataSchema
	})

	done();
};

