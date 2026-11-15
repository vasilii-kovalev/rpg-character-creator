import { literal, object, variant } from "valibot";

import { AbilityIdSchema } from "../../abilities/schemas/base";
import { ActionIdSchema } from "../../actions/schemas/base";
import { SpeedSchema } from "../../ancestries/schemas/base";
import { CONDITION_ID } from "../../conditions/constants";
import { FrightenedChangeSchema, SickenedChangeSchema, StunnedChangeSchema } from "../../conditions/schemas/derived";
import { GRANT_TYPE } from "../constants";

const ConditionEffectChangeSchema = variant("condition", [
	object({
		change: FrightenedChangeSchema,
		condition: literal(CONDITION_ID.FRIGHTENED),
		type: literal(GRANT_TYPE.CONDITION_EFFECT_CHANGE),
	}),
	object({
		change: SickenedChangeSchema,
		condition: literal(CONDITION_ID.SICKENED),
		type: literal(GRANT_TYPE.CONDITION_EFFECT_CHANGE),
	}),
	object({
		change: StunnedChangeSchema,
		condition: literal(CONDITION_ID.STUNNED),
		type: literal(GRANT_TYPE.CONDITION_EFFECT_CHANGE),
	}),
]);

export const GrantSchema = variant("type", [
	object({
		ability: AbilityIdSchema,
		type: literal(GRANT_TYPE.ABILITY),
	}),
	object({
		action: ActionIdSchema,
		type: literal(GRANT_TYPE.ACTION),
	}),
	ConditionEffectChangeSchema,
	object({
		type: literal(GRANT_TYPE.SPEED_CHANGE),
		value: SpeedSchema,
	}),
]);
