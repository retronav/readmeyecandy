import fastifyEnv from "@fastify/env";
import fastify from "fastify";
import { JSONFilePreset } from "lowdb/node";
import { getWakapiStats } from "./wakapi.ts";
import { readmeImage } from "./img.ts";

interface Stats {
	visitors: number;
	codingStats: string;
}

const envSchema = {
	type: "object",
	required: ["WAKAPI_ENDPOINT", "WAKAPI_USERNAME"],
	properties: {
		PORT: {
			type: "string",
			default: 8080,
		},
		WAKAPI_ENDPOINT: {
			type: "string",
		},
		WAKAPI_USERNAME: {
			type: "string",
		},
	},
};

const db = await JSONFilePreset<Stats>("db.json", {
	visitors: 0,
	codingStats: "",
});

const app = fastify({ logger: true, trustProxy: true });

await app.register(fastifyEnv, { schema: envSchema, dotenv: true });

app.get("/readme", async (request, reply) => {
	console.log(request.ip);

	const stats = await getWakapiStats(
		app.config.WAKAPI_ENDPOINT,
		app.config.WAKAPI_USERNAME
	);

	db.update((data) => {
		data.visitors += 1;
		data.codingStats = stats;
	});
	reply.header("content-type", "image/svg+xml");
	reply.send(await readmeImage(db.data.visitors, db.data.codingStats));
});

await app.listen({ port: app.config.PORT });
