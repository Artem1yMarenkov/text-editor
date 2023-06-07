import { FastifySchema } from "fastify"

export const PostShchemaProperties = {
	title: { type: "string" },
	content: { type: "string" },
	_id: { type: "string" }
}

export const PostSchema = {
	type: "object",
	properties: PostShchemaProperties
}

export const StatusCodeSchema = { 
	type: "number"
}

export const ResponseSchema = {
	400: {
		type: "object",
		properties: {
			statusCode: { type: "number" },
			error: { type: "string" },
			data: { type: "object", default: null }
		}
	},
	500: {
		type: "object",
		properties: {
			statusCode: { type: "number" },
			error: { type: "string" },
			data: { type: "object", default: null }
		}
	}
}

export const CreatePostRouterSchema: FastifySchema = {
	description: "Создание поста",
	tags: ["post"],
	body: {
		type: "object",
		required: ["postData"],
		properties: {
			postData: { 
				type: "object", 
				required: ["title", "content"], 
				properties: {
					title: { type: "string" },
					content: { type: "string" }
				}
			},
		},
	},
	response: {
		200: {
			type: "object",
			properties: {
				statusCode: StatusCodeSchema,
				error: { type: "object", default: null },
				data: PostSchema
			}
		},
		400: ResponseSchema["400"],
		500: ResponseSchema["500"]
	}
}

export const GetAllPostRouterSchema: FastifySchema = {
	description: "Получение всех постов по ID Автора",
	tags: ["post"],
	response: {
		200: {
			type: "object",
			properties: {
				statusCode: StatusCodeSchema,
				error: { type: "object" },
				data: {
					type: "array",
					items: PostSchema
				}
			}
		},
		400: ResponseSchema["400"],
		500: ResponseSchema["500"]
	}
}

export const GetOnePostRouterSchema: FastifySchema = {
	description: "Получение поста по ID",
	tags: ["post"],
	response: {
		200: {
			type: "object",
			properties: {
				statusCode: StatusCodeSchema,
				error: { type: "object", default: null },
				data: PostSchema
			}
		},
		400: ResponseSchema["400"],
		500: ResponseSchema["500"]
	}
}

export const DeletePostRouteSchema: FastifySchema = {
	description: "Удаление поста",
	tags: ["post"],
    response: {
		200: {
			type: "object",
			properties: {
				statusCode: StatusCodeSchema,
				error: { type: "object", default: null },
				data: PostSchema
			}
		},
		400: ResponseSchema["400"],
		500: ResponseSchema["500"]
	}
}

export const UpdatePostRouterSchema = {
	description: "Обовление поста на ID",
	tags: ["post"],
	response: {
		200: {
			type: "object",
			properties: {
				statusCode: StatusCodeSchema,
				error: { type: "object", default: null },
				data: PostSchema
			},
			400: ResponseSchema["400"],
			500: ResponseSchema["500"]
		}
	}
}