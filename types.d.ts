import { FastifyInstance } from "fastify";

declare module "fastify" {
	interface FastifyInstance {
		config: {
			PORT: number;
			WAKAPI_ENDPOINT: string;
			WAKAPI_USERNAME: string;
		};
	}
}
