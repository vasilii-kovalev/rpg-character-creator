import { array, type GenericSchema, lazy, literal, object, variant } from "valibot";

import { AbilityIdSchema } from "../../abilities/schemas/base";
import { AgeSchema } from "../../characters/schemas/base";
import { ComparisonOperatorSchema } from "../../common/schemas/base";
import { FeatIdSchema } from "../../feats/schemas/base";
import { ProficiencyLevelSchema } from "../../proficiencies/schemas/base";
import { SkillIdSchema } from "../../skills/schemas/base";
import { REQUIREMENT_TYPE } from "../constants";
import { type Requirements } from "../types";
import { RequirementGroupTypeSchema } from "./base";

export const RequirementSchema = variant("type", [
	object({
		ability: AbilityIdSchema,
		type: literal(REQUIREMENT_TYPE.ABILITY),
	}),
	object({
		age: AgeSchema,
		operator: ComparisonOperatorSchema,
		type: literal(REQUIREMENT_TYPE.AGE),
	}),
	object({
		feat: FeatIdSchema,
		type: literal(REQUIREMENT_TYPE.FEAT),
	}),
	object({
		operator: ComparisonOperatorSchema,
		proficiencyLevel: ProficiencyLevelSchema,
		skill: SkillIdSchema,
		type: literal(REQUIREMENT_TYPE.SKILL_PROFICIENCY_LEVEL),
	}),
]);

export const RequirementsSchema: GenericSchema<Requirements> = variant("type", [
	RequirementSchema,
	object({
		requirements: array(
			lazy(() => {
				return RequirementsSchema;
			}),
		),
		type: RequirementGroupTypeSchema,
	}),
]);
