import { enum_ } from "valibot";

import { CONDITION_DC, CONDITION_ID, CONDITION_PENALTY_TARGET, CONDITION_RESTRICTION } from "../constants";

export const ConditionDcSchema = enum_(CONDITION_DC);

export const ConditionIdSchema = enum_(CONDITION_ID);

export const ConditionPenaltyTargetSchema = enum_(CONDITION_PENALTY_TARGET);

export const ConditionRestrictionSchema = enum_(CONDITION_RESTRICTION);
