import { type InferOutput } from "valibot";

import { type HeroPointSchema } from "./schemas/base";

export type HeroPoint = InferOutput<typeof HeroPointSchema>;
