export const StatusCodeSchema = { 
	type: "number"
}

export const ResponseSchema = {
	400: {
		type: "object",
		properties: {
			statusCode: { type: "number" },
			error: { type: "string" },
			data: { type: "object", default: null }
		}
	},
	500: {
		type: "object",
		properties: {
			statusCode: { type: "number" },
			error: { type: "string" },
			data: { type: "object", default: null }
		}
	}
}