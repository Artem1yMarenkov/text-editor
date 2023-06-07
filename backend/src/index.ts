import fastify from "fastify";
import { dbInstance } from './database';

import { setHooks } from './hooks';
import { setPlugins } from "./plugins";
import { setRoutes } from "./modules/routes";

declare module "fastify" {
	interface FastifyRequest {
		User: {
			_id: string,
			email: string,
		}
	}
}

const app = fastify({ logger: true });

setPlugins(app);
setHooks(app);
setRoutes(app);

app.ready(() => {
	dbInstance;
	app.swagger();
})

try {
	app.listen({
		port: 5500,
		host: "0.0.0.0"
	});
} catch {
	console.error(`Failed to listen port ${5500}`);
	process.exit(1);
}