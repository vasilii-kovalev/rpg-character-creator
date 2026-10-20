import { defineConfig } from "vite-plus";

import { createNodeWorkspaceConfig } from "../../packages/configs/vite.ts";

const config = defineConfig(createNodeWorkspaceConfig());

export default config;
