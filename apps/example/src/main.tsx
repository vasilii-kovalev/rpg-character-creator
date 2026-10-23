import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { Button } from "packages/ui";

import { router } from "./routes";
import "./styles/global.css";

const root = document.querySelector("#root");

if (root === null) {
	throw new Error("Root element is missing");
}

createRoot(root).render(
	<StrictMode>
		<Button type="button">Shared</Button>
		<RouterProvider router={router} />
	</StrictMode>,
);
