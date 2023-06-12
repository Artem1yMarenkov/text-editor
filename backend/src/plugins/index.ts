import cors from '@fastify/cors'
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import { FastifyInstance } from "fastify";
import { corsConfig, swaggerConfig } from "../shared/config";
import { errorHandler } from './errorHandler';

export const setPlugins = (app: FastifyInstance) => {
	app.register(cors, corsConfig);
	app.register(swagger, swaggerConfig);
	app.register(swaggerUi, { routePrefix: "/docs" });

	app.setErrorHandler(errorHandler);
};