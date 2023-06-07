import { FastifySchema } from "fastify"
import { ResponseSchema, StatusCodeSchema } from "../../shared/shemas"

export const UserSchema = {
	_id: { type: "string" },
	login: { type: "string" },
	email: { type: "string" }
};

export const UpdateUserSchema: FastifySchema = {
	description: "Обновление данных о пользователе",
	tags: ["user"],
	body: {
		type: "object",
		required: ["login", "password", "email"],
		properties: {
			login: { type: "string" },
			password: { type: "string" },
			email: { type: "string" }
		},
	},
	response: {
		200: {
			type: "object",
			properties: {
				statusCode: StatusCodeSchema,
				error: { type: "object", default: null },
				data: UserSchema
			}
		},
		400: ResponseSchema["400"],
		500: ResponseSchema["500"]
	}
}