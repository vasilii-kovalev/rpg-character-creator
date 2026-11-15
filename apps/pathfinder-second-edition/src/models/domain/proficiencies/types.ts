import { type InferOutput } from "valibot";

import { type ProficiencyLevelSchema } from "./schemas/base";

export type ProficiencyLevel = InferOutput<typeof ProficiencyLevelSchema>;
