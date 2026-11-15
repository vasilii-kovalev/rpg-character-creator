import { type InferOutput } from "valibot";

import { type ConditionIdSchema } from "./schemas/base";
import { type ConditionsSchema } from "./schemas/derived";

export type ConditionId = InferOutput<typeof ConditionIdSchema>;

export type Conditions = InferOutput<typeof ConditionsSchema>;

export type Condition = Conditions[ConditionId];
