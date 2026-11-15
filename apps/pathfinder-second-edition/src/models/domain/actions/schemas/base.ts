import { enum_ } from "valibot";

import { ACTION_COST, ACTION_ID } from "../constants";

export const ActionCostSchema = enum_(ACTION_COST);

export const ActionIdSchema = enum_(ACTION_ID);
