import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: 'node_modules/@inkeep/agents-core/dist/db/schema.js',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME || 'file:./local.db'
  },
});