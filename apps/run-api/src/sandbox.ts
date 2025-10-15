import type { SandboxConfig } from "@inkeep/agents-run-api";

export const sandboxConfig: SandboxConfig = {
  provider: "native",
  runtime: "node22",
  timeout: 30000,
  vcpus: 1,
};
