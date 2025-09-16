import { serve } from '@hono/node-server';
import { createManagementApp } from '@inkeep/agents-manage-api';
import { getLogger } from '@inkeep/agents-core';
import { credentialStores } from '../../shared/credential-stores.js';

const logger = getLogger('management-api');

const inkeep_manage_api_port = 3002;
// Create the Hono app
const app = createManagementApp({
  serverConfig: {
    port: inkeep_manage_api_port,
    serverOptions: {
      requestTimeout: 60000,
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
    port: inkeep_manage_api_port,
  },
  (info) => {
    logger.info({}, `📝 Management API running on http://localhost:${inkeep_manage_api_port}`);
    logger.info({}, `📝 OpenAPI documentation available at http://localhost:${inkeep_manage_api_port}/openapi.json`);
  }
)