interface IResponseOptionsType {
	statusCode: number,
	data: string | object | null,
	error: string | null
}

export class Response implements IResponseOptionsType {
	private defaultValues: boolean = false;
	statusCode;
	data;
	error;

	constructor(options: IResponseOptionsType, defaultValues?: boolean) {
		this.statusCode = options.statusCode
		this.data = options.data
		this.error = options.error

		this.defaultValues = defaultValues || false;
	}

	get schema() {
		return {
			type: "object",
			required: Object.keys(this),
			properties: {
				statusCode: { 
					type: "number", 
					default: this.defaultValues ? this.statusCode : undefined
				},
				data: { 
					type: ["object", "string", "null"], 
					default: this.defaultValues ? this.data : undefined
				},
				error: { 
					type: ["string", "null"], 
					default: this.defaultValues ? this.error : undefined
				}
			}
		}
	}
}