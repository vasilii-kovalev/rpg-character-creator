import { type ReactNode } from "react";

// Pages are preloaded at startup. React Router still requires HydrateFallback on lazy routes.
export const PageFallback = (): ReactNode => {
	return null;
};
