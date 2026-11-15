import { type InferOutput } from "valibot";

import { type RequirementGroupTypeSchema } from "./schemas/base";
import { type RequirementSchema } from "./schemas/derived";

// Valibot cannot infer a recursive schema, so `RequirementSchema` is annotated with this type instead.
export type Requirements =
	| InferOutput<typeof RequirementSchema>
	| {
			requirements: Array<Requirements>;
			type: InferOutput<typeof RequirementGroupTypeSchema>;
	  };
