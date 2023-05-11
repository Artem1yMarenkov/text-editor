import cors from '@fastify/cors'
import fastify from "fastify";
import { dbInstance } from './database';

const instance = fastify({
	logger: true
});

instance.register(cors, {
	origin: (_, callback) => {
		callback(null, true);
	}
});

instance.addHook("onRequest", (req, res, done) => {
	req.headers['Content-Type'] = 'application/json';
	done();
})

async function bootstrap() {
	const config = {
		port: 5500,
		host: "0.0.0.0"
	};
	
	try {
		console.log(dbInstance);
		instance.listen(config);
	} catch {
		console.error(`Failed to listen port ${config.port}`);
		process.exit(1);
	}
};

bootstrap();