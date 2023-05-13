import nodemailer from "nodemailer";

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
				user: 'texteditor.info@mail.ru',
				pass: 'qW9iM94nJi57cEGfMWkK',
			}
		});

		return await transporter.sendMail({
			from: `"TextEditor Info" <texteditor.info@mail.ru>`,
			...message,
		});
	} catch (e) {
		console.error(e);
		throw Error("Send email failed")
	}
}