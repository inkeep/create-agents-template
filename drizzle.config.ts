import { defineConfig } from "drizzle-kit";

const getDbConfig = () => {
	// Prefer Turso if both URL + token are set
	if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
		return {
			url: process.env.TURSO_DATABASE_URL,
			authToken: process.env.TURSO_AUTH_TOKEN,
		};
	}

	// Otherwise, fallback to file (must be explicitly set)
	return {
		url: process.env.DB_FILE_NAME || "file:./local.db",
	};
};

export default defineConfig({
	schema: "node_modules/@inkeep/agents-core/dist/db/schema.js",
	dialect: "sqlite",
	dbCredentials: getDbConfig(),
});
