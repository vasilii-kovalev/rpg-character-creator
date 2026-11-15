import { enum_ } from "valibot";

import { PROFICIENCY_LEVEL } from "../constants";

export const ProficiencyLevelSchema = enum_(PROFICIENCY_LEVEL);
