# Inkeep Agent Framework Template 

An Inkeep Agent Framework project with multi-service architecture.

## Quick Start

[Follow these steps in the docs to get started](https://docs.inkeep.com/get-started/quick-start) with the `npx @inkeep/create-agents` CLI command.

## Architecture

This project follows a workspace structure with the following services:
- **Agents Manage UI** (Port 3000): Web interface
  - The agent framework visual builder. From the builder you can create, manage and visualize all your graphs.
- **Agents Manage API** (Port 3002): Agent configuration and management
  - Handles entity management and configuration endpoints.
- **Agents Run API** (Port 3003): Agent execution and chat processing  
  - Handles agent communication. You can interact with your agents either over MCP from an MCP client or through our React UI components library

## Deployment Guides

- [Deploy using Vercel](https://docs.inkeep.com/self-hosting/vercel)
- [Deploy to GCP Compute Engine with Docker Compose](https://docs.inkeep.com/self-hosting/gcp-compute-engine)
- [Deploy using Docker (Local Dev)](https://docs.inkeep.com/self-hosting/docker-local)

---

## Automated Dependency Updates

This template uses **Renovate Bot** to automatically create PRs when new @inkeep packages are published.

