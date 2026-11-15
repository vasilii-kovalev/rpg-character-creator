import { type InferOutput } from "valibot";

import { type WeightSchema } from "./schemas/base";

export type Weight = InferOutput<typeof WeightSchema>;
