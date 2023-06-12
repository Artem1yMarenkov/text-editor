import fastify from "fastify";
import { dbInstance } from './database';

import { setHooks } from './hooks';
import { setPlugins } from "./plugins";
import { setRoutes } from "./modules/routes";
import { initLogFile } from "./plugins/errorHandler";

declare module "fastify" {
	interface FastifyRequest {
		User: {
			_id: string,
			email: string,
		}
	}
}

const app = fastify({ 
	logger: {
		transport: {
			target: "pino-pretty"
		}	
	},
	disableRequestLogging: true
});

setPlugins(app);
setHooks(app);
setRoutes(app);

app.ready(() => {
	dbInstance;
	app.swagger();
	initLogFile();
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