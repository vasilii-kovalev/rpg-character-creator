import { type InferOutput } from "valibot";

import { type AncestryFeatIdSchema } from "./schemas/base";
import { type AncestryFeatSchema } from "./schemas/derived";

export type AncestryFeatId = InferOutput<typeof AncestryFeatIdSchema>;

export type AncestryFeat = InferOutput<typeof AncestryFeatSchema>;
