import cors from '@fastify/cors'
import fastify from "fastify";
import { dbInstance } from './database';
import { userRouter } from './modules/user/user.route';
import { sendEmail } from './utils/mail';
import { renderRegisterMessage } from './utils/mail/templates/auth/Register';

const app = fastify({
	logger: true
});

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

async function bootstrap() {
	const config = {
		port: 5500,
		host: "0.0.0.0"
	};
	
	try {
		console.log(dbInstance);
		app.listen(config);
	} catch {
		console.error(`Failed to listen port ${config.port}`);
		process.exit(1);
	}
};

bootstrap();