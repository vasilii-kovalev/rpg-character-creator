import { enum_ } from "valibot";

import { BELIEF_ID, DEITY_DOMAIN } from "../constants";

export const BeliefIdSchema = enum_(BELIEF_ID);

export const DeityDomainSchema = enum_(DEITY_DOMAIN);
