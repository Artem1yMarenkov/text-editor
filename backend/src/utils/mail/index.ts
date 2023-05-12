import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";

type MessageOptionsType = {
	text: string
	to: string
	subject: string
	html?: string
};

export const sendEmail = async (message: MessageOptionsType) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.mail.ru',
    	port: 465,
		auth: {
			user: 'texteditor.info@mail.ru',
			pass: 'qW9iM94nJi57cEGfMWkK',
		}
	});

	return await transporter.sendMail({
		from: `"TextEditor Info" <texteditor.info@mail.ru>`,
		...message,
	});
}