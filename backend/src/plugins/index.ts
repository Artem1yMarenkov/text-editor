import cors from '@fastify/cors'
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import { FastifyInstance } from "fastify";
import { corsConfig, swaggerConfig } from "../shared/config";
import { CustomError } from "../errors";

export const setPlugins = (app: FastifyInstance) => {
	app.register(cors, corsConfig);
	app.register(swagger, swaggerConfig);
	app.register(swaggerUi, { routePrefix: "/docs" });

	app.setErrorHandler((error, request, reply) => {
		if (error instanceof CustomError) {
			return reply.code(error?.statusCode || 400).send({
				statusCode: error?.statusCode || 400,
				data: null,
				error: error.message
			});
		}
	
		return reply.code(500).send({
			statusCode: error?.statusCode || 500,
			data: null,
			error: error.message
		});
	});
};