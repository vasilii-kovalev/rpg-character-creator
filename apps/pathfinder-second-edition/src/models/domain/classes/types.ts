import { type InferOutput } from "valibot";

import { type ClassIdSchema, type DifficultyClassSchema } from "./schemas/base";
import { type ClassSchema } from "./schemas/derived";

export type ClassId = InferOutput<typeof ClassIdSchema>;

export type Class = InferOutput<typeof ClassSchema>;

export type DifficultyClass = InferOutput<typeof DifficultyClassSchema>;
