import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, loginUser } from "./user.service";
import generatePassword from "generate-password";
import { renderRegisterMessage } from "../../utils/mail/templates/auth/Register";
import { sendEmail } from "../../utils/mail";

export const registerUserHandler = async (request: FastifyRequest<{ Body: { login: string, email: string } }>, reply: FastifyReply) => {
	const { login, email } = request.body;
	const password = generatePassword.generate({ length: 10 });

	try {
		await createUser(login, email, password);

		const computedMessage = renderRegisterMessage(login, email, password);

		await sendEmail({
			to: email,
			subject: "TextEditor | Уведомление о регистрации на сервисе TextEditor",
			text: "",
			html: computedMessage
		});
		
		return reply.code(200).send({
			error: false,
			data: null,
			message: "User registration completed successfully"
		})
	} catch (e) {
		console.error(e);

		return reply.code(500).send({
			error: true,
			data: null,
			message: "Server error"
		})
	}
};

export const loginUserHandler = async (request: FastifyRequest<{ Body: { password: string, email: string }}>, reply: FastifyReply) => {
	const { email, password } = request.body;

	try {
		await loginUser(email, password);
	} catch (e) {
		console.error(e);

		return reply.code(500).send({
			error: true,
			data: null,
			message: "Server Error"
		})
	}
};

export const logoutUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {};