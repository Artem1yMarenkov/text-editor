import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, loginUser } from "./user.service";
import generatePassword from "generate-password";
import { renderRegisterMessage } from "../../utils/mail/templates/auth/Register";
import { sendEmail } from "../../utils/mail";
import jwt from "jsonwebtoken";
import { LoginUserRequestType, RegisterUserRequestType } from "./types";

export const registerUserHandler = async (
	request: FastifyRequest<RegisterUserRequestType>, 
	reply: FastifyReply
) => {
	const { login, email } = request.body;
	const password = generatePassword.generate({ length: 10 });

	const user = await createUser(login, email, password);

	if (user == null) {
		return reply.code(400).send({
			statusCode: 400,
			error: 'User already exists',
			data: null,
		});
	}

	const computedMessage = renderRegisterMessage(login, email, password);

	await sendEmail({
		to: email,
		subject: "TextEditor | Уведомление о регистрации на сервисе TextEditor",
		text: "",
		html: computedMessage
	});
	
	return reply.code(200).send({});
};

export const loginUserHandler = async (
	request: FastifyRequest<LoginUserRequestType>, 
	reply: FastifyReply
) => {
	const { email, password } = request.body;

	const user = await loginUser(email, password);

	if (user == null) {
		return reply.code(400).send({
			error: "Incorrect email or password",
			data: null,
			statusCode: 400
		});
	}

	const payload = {
		email: user.email,
	};
	
	const token = jwt.sign(payload, "secret", { expiresIn: "48h" });

	return reply.code(200).send({
		error: null,
		data: { token },
		statusCode: 200
	})
};

export const logoutUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {};