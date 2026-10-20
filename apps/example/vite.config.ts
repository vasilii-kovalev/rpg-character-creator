import { defineConfig } from "vite-plus";

import { createSiteConfig } from "../../packages/configs/vite.ts";

const config = defineConfig(
	createSiteConfig({
		configModuleUrl: import.meta.url,
		devPort: 5174,
	}),
);

export default config;
