import { type InferOutput } from "valibot";

import { type BeliefIdSchema } from "./schemas/base";
import { type FaithDevoteeBenefitsSchema } from "./schemas/derived";

export type BeliefId = InferOutput<typeof BeliefIdSchema>;

export type FaithDevoteeBenefits = InferOutput<typeof FaithDevoteeBenefitsSchema>;
