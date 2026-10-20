import { defineConfig } from "vite-plus";

import { createUiWorkspaceConfig } from "../../packages/configs/vite.ts";

const config = defineConfig(createUiWorkspaceConfig());

export default config;
