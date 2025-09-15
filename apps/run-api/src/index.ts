import { serve } from '@hono/node-server';
import { createExecutionApp } from '@inkeep/agents-run-api';
import { credentialStores } from '../../shared/credential-stores.js';
import { getLogger } from '@inkeep/agents-core';

const logger = getLogger('execution-api');


// Create the Hono app
const app = createExecutionApp({
  serverConfig: {
    port: Number(process.env.RUN_API_PORT) || 3003,
    serverOptions: {
      requestTimeout: 120000,
      keepAliveTimeout: 60000,
      keepAlive: true,
    },
  },
  credentialStores,
});

const port = Number(process.env.RUN_API_PORT) || 3003;

// Start the server using @hono/node-server
serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    logger.info({}, `📝 Run API running on http://localhost:${info.port}`);
    logger.info({}, `📝 OpenAPI documentation available at http://localhost:${info.port}/openapi.json`);
  }
);