import { type ReactNode } from "react";

// Pages are preloaded at startup. React Router still requires HydrateFallback on lazy routes.
const PageFallback = (): ReactNode => {
	return null;
};

export { PageFallback };
