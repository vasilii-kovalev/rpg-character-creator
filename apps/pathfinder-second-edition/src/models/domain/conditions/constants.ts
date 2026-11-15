import { ACTION_COST } from "../actions/constants";
import { DEGREE_OF_SUCCESS } from "../common/constants";
import { SAVING_THROW_TYPE } from "../saving-throws/constants";
import { type Conditions } from "./types";

export const CONDITION_ID = {
	FRIGHTENED: "FRIGHTENED",
	SICKENED: "SICKENED",
	STUNNED: "STUNNED",
} as const;

export const CONDITION_AMOUNT = {
	ALL: "ALL",
	VALUE: "VALUE",
} as const;

export const CONDITION_DC = {
	SOURCE_EFFECT: "SOURCE_EFFECT",
} as const;

export const CONDITION_EFFECT = {
	ACTION_LOSS: "ACTION_LOSS",
	RESTRICTION: "RESTRICTION",
	STATUS_PENALTY: "STATUS_PENALTY",
	VALUE_REDUCTION: "VALUE_REDUCTION",
} as const;

export const CONDITION_PENALTY_TARGET = {
	ALL_CHECKS_AND_DCS: "ALL_CHECKS_AND_DCS",
} as const;

export const CONDITION_RESTRICTION = {
	ACTING: "ACTING",
	WILLING_INGESTION: "WILLING_INGESTION",
} as const;

export const CONDITION_TRIGGER = {
	END_OF_TURN: "END_OF_TURN",
	START_OF_TURN: "START_OF_TURN",
} as const;

export const CONDITIONS_MAP: Conditions = {
	[CONDITION_ID.FRIGHTENED]: {
		value: {
			effects: [
				{
					amount: CONDITION_AMOUNT.VALUE,
					target: CONDITION_PENALTY_TARGET.ALL_CHECKS_AND_DCS,
					type: CONDITION_EFFECT.STATUS_PENALTY,
				},
			],
			[CONDITION_TRIGGER.END_OF_TURN]: [
				{
					amount: 1,
					type: CONDITION_EFFECT.VALUE_REDUCTION,
				},
			],
		},
	},
	[CONDITION_ID.SICKENED]: {
		effects: [
			{
				restriction: CONDITION_RESTRICTION.WILLING_INGESTION,
				type: CONDITION_EFFECT.RESTRICTION,
			},
		],
		value: {
			effects: [
				{
					amount: CONDITION_AMOUNT.VALUE,
					target: CONDITION_PENALTY_TARGET.ALL_CHECKS_AND_DCS,
					type: CONDITION_EFFECT.STATUS_PENALTY,
				},
			],
			recoveries: [
				{
					cost: ACTION_COST.ONE_ACTION,
					outcomes: {
						[DEGREE_OF_SUCCESS.CRITICAL_SUCCESS]: [
							{
								amount: 2,
								type: CONDITION_EFFECT.VALUE_REDUCTION,
							},
						],
						[DEGREE_OF_SUCCESS.SUCCESS]: [
							{
								amount: 1,
								type: CONDITION_EFFECT.VALUE_REDUCTION,
							},
						],
					},
					savingThrow: {
						dc: CONDITION_DC.SOURCE_EFFECT,
						type: SAVING_THROW_TYPE.FORTITUDE,
					},
				},
			],
		},
	},
	[CONDITION_ID.STUNNED]: {
		duration: {
			[CONDITION_TRIGGER.START_OF_TURN]: [
				{
					amount: CONDITION_AMOUNT.ALL,
					type: CONDITION_EFFECT.ACTION_LOSS,
				},
			],
		},
		effects: [
			{
				restriction: CONDITION_RESTRICTION.ACTING,
				type: CONDITION_EFFECT.RESTRICTION,
			},
		],
		value: {
			[CONDITION_TRIGGER.START_OF_TURN]: [
				{
					amount: CONDITION_AMOUNT.VALUE,
					consumesValue: true,
					type: CONDITION_EFFECT.ACTION_LOSS,
				},
			],
		},
	},
};
