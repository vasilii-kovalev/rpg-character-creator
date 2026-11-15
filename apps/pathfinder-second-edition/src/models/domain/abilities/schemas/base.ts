import { enum_ } from "valibot";

import { ABILITY_ID, ANCESTRY_ABILITY_ID } from "../constants";

export const AbilityIdSchema = enum_(ABILITY_ID);

export const AncestryAbilityIdSchema = enum_(ANCESTRY_ABILITY_ID);
