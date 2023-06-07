import cors, { FastifyCorsOptions } from '@fastify/cors'
import fastify from "fastify";
import swagger, { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

import { CustomError } from './errors';
import { dbInstance } from './database';

import { userRouter } from './modules/user/user.route';
import { postRouter } from './modules/post/post.router';
import { authMiddleware } from './middlewares/auth';

const app = fastify({ logger: true });

declare module "fastify" {
	interface FastifyRequest {
		User: {
			email: string,
			_id: string
		}
	}
}

const config = {
	port: 5500,
	host: "0.0.0.0"
};

const swaggerConfig: FastifyDynamicSwaggerOptions = {
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

const corsConfig: FastifyCorsOptions = {
	origin: (_, callback) => callback(null, true)
}

async function bootstrap() {
	// Plugins
	await app.register(cors, corsConfig);
	await app.register(swagger, swaggerConfig);
	await app.register(swaggerUi, { routePrefix: "/docs" });

	// Routes
	await app.register(userRouter, { prefix: "/user" });
	await app.register(postRouter, { prefix: "/post" })
	
	// Hooks
	app.addHook("onRequest", (req, res, done) => {
		req.headers['Content-Type'] = 'application/json';
		done();
	});

	app.addHook("preHandler", authMiddleware);

	app.ready(err => {
		if (err) throw err;
		app.swagger();
	})
	
	try {
		dbInstance;
		app.listen(config);
	} catch {
		console.error(`Failed to listen port ${config.port}`);
		process.exit(1);
	}
};

bootstrap();