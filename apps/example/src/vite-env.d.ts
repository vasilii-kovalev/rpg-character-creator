// `define` values are not picked up from `.env`, so the injected database name is declared here.
declare global {
	interface ImportMetaEnv {
		readonly VITE_APPLICATION_DATABASE_NAME: string;
	}
}

export {};
