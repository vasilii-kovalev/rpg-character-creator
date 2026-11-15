import { array, minLength, object, optional, pipe } from "valibot";

import { GrantSchema } from "../../grants/schemas/derived";
import { LevelSchema } from "../../levels/schemas/base";
import { RequirementsSchema } from "../../requirements/schemas/derived";
import { TraitIdSchema } from "../../traits/schemas/base";

export const AncestryFeatSchema = object({
	grants: optional(array(GrantSchema)),
	level: LevelSchema,
	requirements: optional(RequirementsSchema),
	traits: pipe(array(TraitIdSchema), minLength(1)),
});
