import { enum_ } from "valibot";

import { SANCTIFICATION_TRAIT_ID, TRAIT_ID } from "../constants";

export const SanctificationTraitIdSchema = enum_(SANCTIFICATION_TRAIT_ID);

export const TraitIdSchema = enum_(TRAIT_ID);
