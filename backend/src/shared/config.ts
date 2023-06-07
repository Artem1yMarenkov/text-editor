import { FastifyCorsOptions } from "@fastify/cors";
import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
	swagger: {
		info: {
			version: "0.0.1",
			title: "TextEditor REST API Documentation"
		},
		tags: [
			{ name: "user", description: "User related end-points" },
			{ name: "post", description: "Post related end-points" },
		]
	}
}

export const corsConfig: FastifyCorsOptions = {
	origin: (_, callback) => callback(null, true)
}