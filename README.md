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

[Follow these steps in the docs to get started](https://docs.inkeep.com/quick-start/start-development) with the `npx @inkeep/create-agents` CLI command.

## Deploy using Vercel

### 1. Prerequisites
Sign up for a cloud hosted deployment for these services:
- [**Turso Cloud**](https://vercel.com/marketplace/tursocloud)
- [**SigNoz**](https://signoz.io/)
- [**Nango**](https://www.nango.dev/)

> [!NOTE]  
> Instructions coming soon.

## Automated Dependency Updates

This template uses **Renovate Bot** to automatically create PRs when new @inkeep packages are published.

## Deploy using Docker

### 1. Prerequisites

#### Required: Docker
- [Install Docker Desktop](https://www.docker.com/)

#### Optional: Self-host SigNoz and Nango

For full functionality, the **Inkeep Agent Framework** requires [**SigNoz**](https://signoz.io/) and [**Nango**](https://www.nango.dev/). You can sign up for a cloud hosted account with them directly, or you can self host them.

Follow these instructions to self-host both **SigNoz** and **Nango**:

1. Clone our repo with the optional docker files for the agent framework:
```bash
git clone https://github.com/inkeep/agents-optional-local-dev.git
cd agents-optional-local-dev
```

2. Create a `.env` file from the example with an auto-generated `NANGO_ENCRYPTION_KEY`:
```bash
cp .env.example .env && \
  encryption_key=$(openssl rand -base64 32) && \
  sed -i '' "s|<REPLACE_WITH_BASE64_256BIT_ENCRYPTION_KEY>|$encryption_key|" .env && \
  echo "Docker environment file created with auto-generated encryption key"
```

3. Build and deploy **SigNoz**, **Nango**, **OTEL Collector**, and **Jaeger**:
```bash
docker compose \
  --profile nango \
  --profile signoz \
  --profile otel-collector \
  --profile jaeger \
  up -d
```

> [!NOTE]  
> SigNoz and Nango run separately. You can get them running before proceeding with running the Inkeep Agent Framework   

### 2. Setup Environment Variables

To get started from scratch, generate a `.env` file from the example:
```bash
cp .env.example .env
```
Then update the `.env` file with values specific to your environment.

### 3. Build and run the Inkeep Agent Framework locally
This repostory contains a `docker-compose.yml` and template `Dockerfile` for each service:
- `Dockerfile.manage-ui`
- `Dockerfile.manage-api`
- `Dockerfile.run-ui`
  
To run the Inkeep Agent Framework services:
```bash
docker-compose up -d
```
