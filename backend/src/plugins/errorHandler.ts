import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { readFile, writeFile } from "node:fs/promises";

interface ILog {
	date: string,
	error: FastifyError,
	reply: object
}

const writeLog = async (log: ILog) => {
	try {
		const logs = JSON.parse(await readFile(__dirname + "/../../logs", {
			encoding: "utf8"
		})) as ILog[]
		
		await writeFile(
			__dirname + "/../../logs",
			JSON.stringify([...logs, log,], null, 4)
		)
	} catch {
		console.error("ServerError: Cannot write log into the file")
	}
};

export const errorHandler = async (
	error: FastifyError, 
	request: FastifyRequest, 
	reply: FastifyReply
) => {
	const responseObj = {
		statusCode: error?.statusCode ? error.statusCode : 500,
		data: null,
		error: error.message
	};

	await writeLog({
		date: Date(),
		error: error,
		reply: responseObj
	});

	return reply
		.code(responseObj.statusCode)
		.send(responseObj);
}