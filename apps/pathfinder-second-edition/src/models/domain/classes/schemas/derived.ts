import { array, minLength, object, pipe } from "valibot";

import { AttributeSchema } from "../../attributes/schemas/base";

export const ClassSchema = object({
	availableKeyAttributes: pipe(array(AttributeSchema), minLength(1)),
	secondaryAttributes: array(AttributeSchema),
});
