import { RequestGenericInterface } from "fastify";

export interface IReqBody extends RequestGenericInterface {
	Body: {
		link: string;
		cookie: string;
	};
}