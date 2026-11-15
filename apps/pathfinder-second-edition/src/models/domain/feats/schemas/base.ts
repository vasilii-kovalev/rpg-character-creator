import { enum_ } from "valibot";

import { ANCESTRY_FEAT_ID, FEAT_ID } from "../constants";

export const AncestryFeatIdSchema = enum_(ANCESTRY_FEAT_ID);

export const FeatIdSchema = enum_(FEAT_ID);
