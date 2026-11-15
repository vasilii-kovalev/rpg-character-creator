import { type InferOutput } from "valibot";

import { type ActionIdSchema } from "./schemas/base";
import { type ActionSchema } from "./schemas/derived";

export type ActionId = InferOutput<typeof ActionIdSchema>;

export type Action = InferOutput<typeof ActionSchema>;
