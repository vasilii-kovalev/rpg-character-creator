import { enum_ } from "valibot";

import { COMPARISON_OPERATOR } from "../constants";

export const ComparisonOperatorSchema = enum_(COMPARISON_OPERATOR);
