import nodemailer from "nodemailer";
import * as dotenv from 'dotenv'

dotenv.config();

type MessageOptionsType = {
	text: string
	to: string
	subject: string
	html?: string
};

export const sendEmail = async (message: MessageOptionsType) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.mail.ru',
	    	port: 465,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			}
		});

		return await transporter.sendMail({
			from: `"TextEditor Info" <${process.env.EMAIL_USER}>`,
			...message,
		});
	} catch (e) {
		console.error(e);
		throw Error("Send email failed")
	}
}