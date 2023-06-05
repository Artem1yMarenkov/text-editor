type IResponseOptionsType = {
	statusCode: number,
	data: string | object | null,
	error: string | null
}

export const DefaultResponse = (options: IResponseOptionsType) => {
	return {
		type: "object",
		required: Object.keys(options),
		properties: {
			statusCode: { 
				type: "number", 
				default: options.statusCode
			},
			data: { 
				type: ["object", "string", "null"], 
				default: options.data
			},
			error: { 
				type: ["string", "null"], 
				default: options.error
			}
		}
	}
}