export class ServerError extends Error {
	constructor(message: string) {
		super("ServerError: " + message);
		this.name = "ServerError";
	}
};

export class CustomError extends Error {
	constructor(message: string, statusCode: number, options?: object) {
        super("Error: " + message);
        this.name = 'CustomError';
    }
};