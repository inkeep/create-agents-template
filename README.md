# Inkeep Agent Framework Template 

An Inkeep Agent Framework project with multi-service architecture.

## Architecture

This project follows a workspace structure with the following services:

- **Agents Manage API** (Port 3002): Agent configuration and managemen
  - Handles entity management and configuration endpoints.
- **Agents Run API** (Port 3003): Agent execution and chat processing  
  - Handles agent communication. You can interact with your agents either over MCP from an MCP client or through our React UI components library
- **Agents Manage UI** (Port 3000): Web interface available via `inkeep dev`
  - The agent framework visual builder. From the builder you can create, manage and visualize all your graphs.

## Quick Start
1. **Install the Inkeep CLI:**
   ```bash
   pnpm install -g @inkeep/agents-cli
   ```

1. **Start services:**
   ```bash
   # Install dependencies
   pnpm install
   
   # Start Agents Manage API and Agents Run API
   pnpm dev
   
   # Start the Dashboard
   inkeep dev
   ```

3. **Deploy your first agent graph:**
   ```bash
   # Navigate to your project's graph directory
   cd src/<project-name>/
   
   # Push the weather graph to create it
   inkeep push weather.graph.ts
   ```
  - Follow the prompts to create the project and graph
  - Click on the "View graph in UI:" link to see the graph in the management dashboard

## Project Structure

```
test/
├── src/
│   ├── /<project-name>              # Agent configurations
├── apps/
│   ├── manage-api/          # Agents Manage API service
│   ├── run-api/             # Agents Run API service
│   └── shared/              # Shared code between API services
│       └── credential-stores.ts  # Shared credential store configuration
├── turbo.json               # Turbo configuration
├── pnpm-workspace.yaml      # pnpm workspace configuration
└── package.json             # Root package configuration
```

## Configuration

### Environment Variables

Environment variables are defined in the following places:

- `apps/manage-api/.env`: Agents Manage API environment variables
- `apps/run-api/.env`: Agents Run API environment variables
- `src/<project-name>/.env`: Inkeep CLI environment variables
- `.env`: Root environment variables 

To change the API keys used by your agents modify `apps/run-api/.env`. You are required to define at least one LLM provider key.

```bash
# AI Provider Keys
ANTHROPIC_API_KEY=your-anthropic-key-here
OPENAI_API_KEY=your-openai-key-here
```



### Agent Configuration

Your graphs are defined in `src<project-name>weather.graph.ts`. The default setup includes:

- **Weather Graph**: A graph that can forecast the weather in a given location.

Your inkeep configuration is defined in `src/<project-name>/inkeep.config.ts`. The inkeep configuration is used to configure defaults for the inkeep CLI. The configuration includes:

- `tenantId`: The tenant ID
- `projectId`: The project ID
- `agentsManageApiUrl`: The Manage API URL
- `agentsRunApiUrl`: The Run API URL


## Development

### Updating Your Agents

1. Edit `src/<project-name>/weather.graph.ts`
2. Push the graph to the platform to update: `inkeep pus weather.graph.ts` 

### API Documentation

Once services are running, view the OpenAPI documentation:

- Manage API: http://localhost:3002/docs
- Run API: http://localhost:3003/docs

## Learn More

- [Inkeep Documentation](https://docs.inkeep.com)

## Troubleshooting

## Inkeep CLI commands

- Ensure you are runnning commands from `cd src/<project-name>`.
- Validate the `inkeep.config.ts` file has the correct api urls.
- Validate that the `.env` file in `src/<project-name>` has the correct `DB_FILE_NAME`.

### Services won't start

1. Ensure all dependencies are installed: `pnpm install`
2. Check that ports 3000-3003 are available

### Agents won't respond

1. Ensure that the Agents Run API is running and includes a valid Anthropic or OpenAI API key in its .env file

## Deploy using Vercel

> [!NOTE]  
> Instructions coming soon.

## Deploy using Docker

### 1. Prerequisites

#### Required: Docker
- [Install Docker Desktop](https://www.docker.com/)

#### Optional: Self-host SigNoz and Nango

For full functionality, the **Inkeep Agent Framework** requires [**SigNoz**](https://signoz.io/) and [**Nango**](https://www.nango.dev/). You can sign up for a cloud hosted account with them directly, or you can self host them.

Follow these instructions to self-host both **SigNoz** and **Nango**:

1. Clone our repo with the optional docker files for the agent framework:
```
git clone https://github.com/inkeep/agents-optional-local-dev.git
cd agents-optional-local-dev
```

2. Create a `.env` file from the example with an auto-generated `NANGO_ENCRYPTION_KEY`:
```
cp .env.example .env && \
  encryption_key=$(openssl rand -base64 32) && \
  sed -i '' "s|<REPLACE_WITH_BASE64_256BIT_ENCRYPTION_KEY>|$encryption_key|" .env && \
  echo "Docker environment file created with auto-generated encryption key"
```

3. Build and deploy **SigNoz and Nango** (it also includes a deployment of an **OTEL Collector** and **Jaeger**):
```
docker-compose up -d
```

> [!NOTE]  
> SigNoz and Nango run separately. You can get them running before proceeding with running the Inkeep Agent Framework   

### 2. Setup Environment Variables

To get started from scratch, generate a `.env` file from the example:
```
cp .env.example .env
```
Then update the `.env` file with values specific to your environment.

### 3. Build and run the Inkeep Agent Framework locally
This repostory contains a `docker-compose.yml` and template `Dockerfile` for each service:
- `Dockerfile.manage-ui`
- `Dockerfile.manage-api`
- `Dockerfile.run-ui`
- `Dockerfile.migrate` (for first-time setup)
  
On your first-time setup, you only need to run this migration once to prepare the database:
```
docker compose --profile migrate run --rm inkeep-agents-migrate
```

To run the Inkeep Agent Framework services:
```
docker-compose up -d
```
