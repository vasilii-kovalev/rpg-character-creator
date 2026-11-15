import { type InferOutput } from "valibot";

import { type AttributeModifierSchema, type AttributeSchema } from "./schemas/base";

export type Attribute = InferOutput<typeof AttributeSchema>;

export type AttributeModifier = InferOutput<typeof AttributeModifierSchema>;
