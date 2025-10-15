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

[Follow these steps in the docs to get started](https://docs.inkeep.com/get-started/quick-start) with the `npx @inkeep/create-agents` CLI command.

# Deploy using Vercel

### 1. Prerequisites
Sign up for a cloud hosted deployment for these services:
- [**Turso on Vercel**](https://vercel.com/marketplace/tursocloud) or directly at [**Turso Cloud**](https://app.turso.tech)
- [**SigNoz**](https://signoz.io/)
- [**Nango**](https://www.nango.dev/)

Follow this guide for how to [Deploy the Inkeep Agent Framework to Vercel](https://docs.inkeep.com/self-hosting/vercel)

# Deploy using Docker (development)

### 1. Complete the quickstart or clone this repository
Follow the quickstart using `npx @inkeep/create-agents` or clone this repository `git clone git@github.com:inkeep/create-agents-template.git`

### 2. Prerequisites

#### Required: Docker
- [Install Docker Desktop](https://www.docker.com/)

#### SigNoz and Nango

For full functionality, the **Inkeep Agent Framework** requires [**SigNoz**](https://signoz.io/) and [**Nango**](https://www.nango.dev/). You can sign up for a cloud hosted account with them directly, or you can self host them.

Follow these instructions to self-host both **SigNoz** and **Nango**:

1. Clone the `inkeep/agents-optional-local-dev` repo separately, with the docker files for SigNoz and Nango:
```bash
git clone https://github.com/inkeep/agents-optional-local-dev.git
cd agents-optional-local-dev
```

2. Create a `.env` file from the example with an auto-generated `NANGO_ENCRYPTION_KEY`:
```bash
cp .env.example .env && \
  encryption_key=$(openssl rand -base64 32) && \
  sed -i'' "s|<REPLACE_WITH_BASE64_256BIT_ENCRYPTION_KEY>|$encryption_key|" .env && \
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

4. SigNoz API Key    

To get your SigNoz API key:
- Open SigNoz at `http://localhost:3080`
- Navigate to Settings → Account Settings → API Keys → New Key
- Choose a role (Admin, Editor, or Viewer) - Viewer is sufficient for observability
- Set the expiration field to "No Expiry" to prevent the key from expiring

5. Nango Secret Key
   
To get your Nango secret key:
- Open Nango at `http://localhost:3050`
- Navigate to Environment Settings and copy the secret key

> [!NOTE]  
> SigNoz and Nango run separately. You can get them running before proceeding with running the Inkeep Agent Framework   

### 2. Setup Environment Variables   

In your agent project directory, generate a `.env.docker` file from the example:
```bash
cp .env.example .env.docker
```
Then update the `.env.docker` file with values specific to your environment.

### 3. Run the Inkeep Agent Framework

```bash
docker-compose -f docker-compose.standalone.yml --env-file .env.docker up -d
```

Confirm all services are running with `docker ps`:
```
inkeep/agents-run-api:latest
inkeep/agents-manage-api:latest
inkeep/agents-manage-ui:latest
signoz/signoz-otel-collector:v0.129.6
signoz/signoz:v0.96.1
clickhouse/clickhouse-server:25.5.6
nangohq/nango-server:hosted-0.68.0
redis:7.2.4
postgres:16.0-alpine
jaegertracing/all-in-one:1.73.0
otel/opentelemetry-collector:0.135.0
signoz/zookeeper:3.7.1
```

---

## Automated Dependency Updates

This template uses **Renovate Bot** to automatically create PRs when new @inkeep packages are published.

