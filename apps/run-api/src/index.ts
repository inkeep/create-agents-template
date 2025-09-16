import { serve } from '@hono/node-server';
import { createExecutionApp } from '@inkeep/agents-run-api';
import { credentialStores } from '../../shared/credential-stores.js';
import { getLogger } from '@inkeep/agents-core';

const logger = getLogger('execution-api');


const inkeep_run_api_port = 3003;

// Create the Hono app
const app = createExecutionApp({
  serverConfig: {
    port: inkeep_run_api_port,
    serverOptions: {
      requestTimeout: 120000,
      keepAliveTimeout: 60000,
      keepAlive: true,
    },
  },
  credentialStores,
});

// Start the server using @hono/node-server
serve(
  {
    fetch: app.fetch,
    port: inkeep_run_api_port,
  },
  (info) => {
    logger.info({}, `📝 Run API running on http://localhost:${inkeep_run_api_port}`);
    logger.info({}, `📝 OpenAPI documentation available at http://localhost:${inkeep_run_api_port}/openapi.json`);
  }
);