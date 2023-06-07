export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			EMAIL_USER: string;
			EMAIL_PASS: string;
			SECRET_KEY: string;
		}
	}
}