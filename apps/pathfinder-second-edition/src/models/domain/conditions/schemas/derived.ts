import { array, boolean, integer, literal, minValue, number, optional, partial, pipe, strictObject } from "valibot";

import { ActionCostSchema } from "../../actions/schemas/base";
import { DEGREE_OF_SUCCESS } from "../../common/constants";
import { SavingThrowTypeSchema } from "../../saving-throws/schemas/base";
import { CONDITION_AMOUNT, CONDITION_EFFECT, CONDITION_ID, CONDITION_TRIGGER } from "../constants";
import { ConditionDcSchema, ConditionPenaltyTargetSchema, ConditionRestrictionSchema } from "./base";

const ConditionValueReductionSchema = strictObject({
	amount: pipe(number(), integer(), minValue(1)),
	type: literal(CONDITION_EFFECT.VALUE_REDUCTION),
});

const ConditionValueStatusPenaltySchema = strictObject({
	amount: literal(CONDITION_AMOUNT.VALUE),
	target: ConditionPenaltyTargetSchema,
	type: literal(CONDITION_EFFECT.STATUS_PENALTY),
});

const ConditionRestrictionEffectSchema = strictObject({
	restriction: ConditionRestrictionSchema,
	type: literal(CONDITION_EFFECT.RESTRICTION),
});

const ConditionValueActionLossSchema = strictObject({
	amount: literal(CONDITION_AMOUNT.VALUE),
	consumesValue: boolean(),
	type: literal(CONDITION_EFFECT.ACTION_LOSS),
});

const ConditionAllActionsLossSchema = strictObject({
	amount: literal(CONDITION_AMOUNT.ALL),
	type: literal(CONDITION_EFFECT.ACTION_LOSS),
});

const ConditionValueRecoverySchema = strictObject({
	cost: ActionCostSchema,
	outcomes: strictObject({
		[DEGREE_OF_SUCCESS.CRITICAL_FAILURE]: optional(array(ConditionValueReductionSchema)),
		[DEGREE_OF_SUCCESS.CRITICAL_SUCCESS]: optional(array(ConditionValueReductionSchema)),
		[DEGREE_OF_SUCCESS.FAILURE]: optional(array(ConditionValueReductionSchema)),
		[DEGREE_OF_SUCCESS.SUCCESS]: optional(array(ConditionValueReductionSchema)),
	}),
	savingThrow: strictObject({
		dc: ConditionDcSchema,
		type: SavingThrowTypeSchema,
	}),
});

const FrightenedValueSchema = strictObject({
	effects: array(ConditionValueStatusPenaltySchema),
	[CONDITION_TRIGGER.END_OF_TURN]: array(ConditionValueReductionSchema),
});

const FrightenedSchema = strictObject({
	value: FrightenedValueSchema,
});

export const FrightenedChangeSchema = partial(
	strictObject({
		value: partial(FrightenedValueSchema),
	}),
);

const SickenedValueSchema = strictObject({
	effects: array(ConditionValueStatusPenaltySchema),
	recoveries: array(ConditionValueRecoverySchema),
});

const SickenedSchema = strictObject({
	effects: array(ConditionRestrictionEffectSchema),
	value: SickenedValueSchema,
});

export const SickenedChangeSchema = partial(
	strictObject({
		effects: SickenedSchema.entries.effects,
		value: partial(SickenedValueSchema),
	}),
);

const StunnedDurationSchema = strictObject({
	[CONDITION_TRIGGER.START_OF_TURN]: array(ConditionAllActionsLossSchema),
});

const StunnedValueSchema = strictObject({
	[CONDITION_TRIGGER.START_OF_TURN]: array(ConditionValueActionLossSchema),
});

const StunnedSchema = strictObject({
	duration: StunnedDurationSchema,
	effects: array(ConditionRestrictionEffectSchema),
	value: StunnedValueSchema,
});

export const StunnedChangeSchema = partial(
	strictObject({
		duration: partial(StunnedDurationSchema),
		effects: StunnedSchema.entries.effects,
		value: partial(StunnedValueSchema),
	}),
);

export const ConditionsSchema = strictObject({
	[CONDITION_ID.FRIGHTENED]: FrightenedSchema,
	[CONDITION_ID.SICKENED]: SickenedSchema,
	[CONDITION_ID.STUNNED]: StunnedSchema,
});
