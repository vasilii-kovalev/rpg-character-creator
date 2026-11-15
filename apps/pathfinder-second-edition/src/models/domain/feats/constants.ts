import { ABILITY_ID } from "../abilities/constants";
import { ACTION_ID } from "../actions/constants";
import { COMPARISON_OPERATOR } from "../common/constants";
import { CONDITION_EFFECT, CONDITION_ID, CONDITION_TRIGGER } from "../conditions/constants";
import { GRANT_TYPE } from "../grants/constants";
import { PROFICIENCY_LEVEL } from "../proficiencies/constants";
import { REQUIREMENT_TYPE } from "../requirements/constants";
import { SKILL_ID } from "../skills/constants";
import { TRAIT_ID } from "../traits/constants";
import { type AncestryFeat, type AncestryFeatId } from "./types";

export const ANCESTRY_FEAT_ID = {
	AGELESS_PATIENCE: "AGELESS_PATIENCE",
	ANCESTRAL_LONGEVITY: "ANCESTRAL_LONGEVITY",
	ANCESTRAL_SUSPICION: "ANCESTRAL_SUSPICION",
	AVENGE_ALLY: "AVENGE_ALLY",
	BOULDER_ROLL: "BOULDER_ROLL",
	DEFY_THE_DARKNESS: "DEFY_THE_DARKNESS",
	DWARVEN_DOUGHTINESS: "DWARVEN_DOUGHTINESS",
	DWARVEN_LORE: "DWARVEN_LORE",
	DWARVEN_REINFORCEMENT: "DWARVEN_REINFORCEMENT",
	DWARVEN_WEAPON_FAMILIARITY: "DWARVEN_WEAPON_FAMILIARITY",
	ECHOES_IN_STONE: "ECHOES_IN_STONE",
	ELF_STEP: "ELF_STEP",
	ELVEN_LORE: "ELVEN_LORE",
	ELVEN_WEAPON_FAMILIARITY: "ELVEN_WEAPON_FAMILIARITY",
	EXPERT_LONGEVITY: "EXPERT_LONGEVITY",
	FORLORN: "FORLORN",
	MAGIC_RIDER: "MAGIC_RIDER",
	MARCH_THE_MINES: "MARCH_THE_MINES",
	MARTIAL_EXPERIENCE: "MARTIAL_EXPERIENCE",
	MOUNTAIN_STRATEGY: "MOUNTAIN_STRATEGY",
	MOUNTAIN_S_STOUTNESS: "MOUNTAIN_S_STOUTNESS",
	NIMBLE_ELF: "NIMBLE_ELF",
	OTHERWORLDLY_ACUMEN: "OTHERWORLDLY_ACUMEN",
	OTHERWORLDLY_MAGIC: "OTHERWORLDLY_MAGIC",
	ROCK_RUNNER: "ROCK_RUNNER",
	STONEGATE: "STONEGATE",
	STONEMASON_S_EYE: "STONEMASON_S_EYE",
	STONEWALKER: "STONEWALKER",
	STONEWALL: "STONEWALL",
	STONE_BONES: "STONE_BONES",
	TELLURIC_POWER: "TELLURIC_POWER",
	TREE_CLIMBER: "TREE_CLIMBER",
	UNBURDENED_IRON: "UNBURDENED_IRON",
	UNIVERSAL_LONGEVITY: "UNIVERSAL_LONGEVITY",
	UNWAVERING_MIEN: "UNWAVERING_MIEN",
} as const;

const CLASS_FEAT_ID = {
	HARM: "HARM",
	HEAL: "HEAL",
} as const;

const GENERAL_FEAT_ID = {
	ADDITIONAL_LORE: "ADDITIONAL_LORE",
} as const;

export const FEAT_ID = {
	...ANCESTRY_FEAT_ID,
	...CLASS_FEAT_ID,
	...GENERAL_FEAT_ID,
} as const;

export const ANCESTRY_FEATS_MAP: Record<AncestryFeatId, AncestryFeat> = {
	[FEAT_ID.BOULDER_ROLL]: {
		grants: [
			{
				action: ACTION_ID.BOULDER_ROLL,
				type: GRANT_TYPE.ACTION,
			},
		],
		level: 5,
		requirements: {
			feat: FEAT_ID.ROCK_RUNNER,
			type: REQUIREMENT_TYPE.FEAT,
		},
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.DEFY_THE_DARKNESS]: {
		grants: [
			{
				ability: ABILITY_ID.GREATER_DARKVISION,
				type: GRANT_TYPE.ABILITY,
			},
		],
		level: 5,
		requirements: {
			ability: ABILITY_ID.DARKVISION,
			type: REQUIREMENT_TYPE.ABILITY,
		},
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.DWARVEN_DOUGHTINESS]: {
		grants: [
			{
				change: {
					value: {
						[CONDITION_TRIGGER.END_OF_TURN]: [
							{
								amount: 2,
								type: CONDITION_EFFECT.VALUE_REDUCTION,
							},
						],
					},
				},
				condition: CONDITION_ID.FRIGHTENED,
				type: GRANT_TYPE.CONDITION_EFFECT_CHANGE,
			},
		],
		level: 1,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.DWARVEN_LORE]: {
		level: 1,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.DWARVEN_REINFORCEMENT]: {
		level: 5,
		requirements: {
			operator: COMPARISON_OPERATOR.GREATER_THAN_OR_EQUAL,
			proficiencyLevel: PROFICIENCY_LEVEL.EXPERT,
			skill: SKILL_ID.CRAFTING,
			type: REQUIREMENT_TYPE.SKILL_PROFICIENCY_LEVEL,
		},
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.DWARVEN_WEAPON_FAMILIARITY]: {
		level: 1,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.ECHOES_IN_STONE]: {
		grants: [
			{
				action: ACTION_ID.ECHOES_IN_STONE,
				type: GRANT_TYPE.ACTION,
			},
		],
		level: 9,
		traits: [TRAIT_ID.CONCENTRATE, TRAIT_ID.DWARF],
	},
	[FEAT_ID.MARCH_THE_MINES]: {
		level: 13,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.MOUNTAIN_STRATEGY]: {
		level: 1,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.MOUNTAIN_S_STOUTNESS]: {
		level: 9,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.ROCK_RUNNER]: {
		level: 1,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.STONEGATE]: {
		level: 17,
		traits: [TRAIT_ID.DWARF, TRAIT_ID.UNCOMMON],
	},
	[FEAT_ID.STONEMASON_S_EYE]: {
		level: 1,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.STONEWALKER]: {
		level: 9,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.STONEWALL]: {
		grants: [
			{
				action: ACTION_ID.STONEWALL,
				type: GRANT_TYPE.ACTION,
			},
		],
		level: 17,
		traits: [TRAIT_ID.DWARF, TRAIT_ID.EARTH, TRAIT_ID.POLYMORPH],
	},
	[FEAT_ID.STONE_BONES]: {
		grants: [
			{
				action: ACTION_ID.STONE_BONES,
				type: GRANT_TYPE.ACTION,
			},
		],
		level: 9,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.TELLURIC_POWER]: {
		level: 13,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.UNBURDENED_IRON]: {
		level: 1,
		traits: [TRAIT_ID.DWARF],
	},
	[FEAT_ID.AGELESS_PATIENCE]: {
		level: 5,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.ANCESTRAL_LONGEVITY]: {
		level: 1,
		requirements: {
			age: 100,
			operator: COMPARISON_OPERATOR.GREATER_THAN_OR_EQUAL,
			type: REQUIREMENT_TYPE.AGE,
		},
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.ANCESTRAL_SUSPICION]: {
		level: 5,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.AVENGE_ALLY]: {
		grants: [
			{
				action: ACTION_ID.AVENGE_ALLY,
				type: GRANT_TYPE.ACTION,
			},
		],
		level: 13,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.ELF_STEP]: {
		grants: [
			{
				action: ACTION_ID.ELF_STEP,
				type: GRANT_TYPE.ACTION,
			},
		],
		level: 9,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.ELVEN_LORE]: {
		level: 1,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.ELVEN_WEAPON_FAMILIARITY]: {
		level: 1,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.EXPERT_LONGEVITY]: {
		level: 9,
		requirements: {
			feat: FEAT_ID.ANCESTRAL_LONGEVITY,
			type: REQUIREMENT_TYPE.FEAT,
		},
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.FORLORN]: {
		level: 1,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.MAGIC_RIDER]: {
		level: 17,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.MARTIAL_EXPERIENCE]: {
		level: 5,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.NIMBLE_ELF]: {
		grants: [
			{
				type: GRANT_TYPE.SPEED_CHANGE,
				value: 5,
			},
		],
		level: 1,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.OTHERWORLDLY_ACUMEN]: {
		level: 9,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.OTHERWORLDLY_MAGIC]: {
		level: 1,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.TREE_CLIMBER]: {
		level: 9,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.UNIVERSAL_LONGEVITY]: {
		grants: [
			{
				action: ACTION_ID.UNIVERSAL_LONGEVITY,
				type: GRANT_TYPE.ACTION,
			},
		],
		level: 13,
		traits: [TRAIT_ID.ELF],
	},
	[FEAT_ID.UNWAVERING_MIEN]: {
		level: 1,
		traits: [TRAIT_ID.ELF],
	},
};
