import { object } from "valibot";

import { ActionCostSchema } from "./base";

export const ActionSchema = object({
	cost: ActionCostSchema,
});
