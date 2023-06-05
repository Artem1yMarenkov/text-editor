import cors from '@fastify/cors'
import fastify from "fastify";
import { userRouter } from './modules/user/user.route';
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const app = fastify({
	logger: true
});


async function bootstrap() {
	const config = {
		port: 5500,
		host: "0.0.0.0"
	};

	await app.register(swagger, {
		swagger: {
			info: {
				version: "0.0.1",
				title: "TextEditor REST API Documentation"
			},
		}
	});

	await app.register(swaggerUi, { routePrefix: "/docs" })

	app.register(cors, {
		origin: (_, callback) => {
			callback(null, true);
		}
	});
	
	app.register(userRouter, { prefix: "/user" });
	
	app.addHook("onRequest", (req, res, done) => {
		req.headers['Content-Type'] = 'application/json';
		done();
	});

	app.ready(err => {
		if (err) throw err;
		app.swagger();
	})
	
	try {
		app.listen(config);
	} catch {
		console.error(`Failed to listen port ${config.port}`);
		process.exit(1);
	}
};

bootstrap();