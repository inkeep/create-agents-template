import { serve } from '@hono/node-server';
import { createManagementApp } from '@inkeep/agents-manage-api';
import { getLogger } from '@inkeep/agents-core';
import { credentialStores } from '../../shared/credential-stores.js';

const logger = getLogger('management-api');

// Create the Hono app
const app = createManagementApp({
  serverConfig: {
    port: Number(process.env.MANAGE_API_PORT) || 3002,
    serverOptions: {
      requestTimeout: 60000,
      keepAliveTimeout: 60000,
      keepAlive: true,
    },
  },
  credentialStores,
});

const port = Number(process.env.MANAGE_API_PORT) || 3002;

// Start the server using @hono/node-server
serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    logger.info({}, `📝 Management API running on http://localhost:${info.port}`);
    logger.info({}, `📝 OpenAPI documentation available at http://localhost:${info.port}/openapi.json`);
  }
);