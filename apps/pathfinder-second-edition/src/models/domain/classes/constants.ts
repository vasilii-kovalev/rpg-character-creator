import { ATTRIBUTE, ATTRIBUTES_ALL } from "../attributes/constants";
import { type Class, type ClassId } from "./types";

export const CLASS_ID = {
	BARD: "BARD",
	CLERIC: "CLERIC",
	DRUID: "DRUID",
	FIGHTER: "FIGHTER",
	RANGER: "RANGER",
	ROGUE: "ROGUE",
	WITCH: "WITCH",
	WIZARD: "WIZARD",
} as const;

export const CLASSES_MAP: Record<ClassId, Class> = {
	[CLASS_ID.BARD]: {
		availableKeyAttributes: [ATTRIBUTE.CHARISMA],
		secondaryAttributes: [ATTRIBUTE.CONSTITUTION, ATTRIBUTE.DEXTERITY],
	},
	[CLASS_ID.CLERIC]: {
		availableKeyAttributes: [ATTRIBUTE.WISDOM],
		secondaryAttributes: [ATTRIBUTE.CHARISMA, ATTRIBUTE.CONSTITUTION],
	},
	[CLASS_ID.DRUID]: {
		availableKeyAttributes: [ATTRIBUTE.WISDOM],
		secondaryAttributes: [ATTRIBUTE.CONSTITUTION, ATTRIBUTE.DEXTERITY],
	},
	[CLASS_ID.FIGHTER]: {
		availableKeyAttributes: [ATTRIBUTE.DEXTERITY, ATTRIBUTE.STRENGTH],
		secondaryAttributes: [ATTRIBUTE.CONSTITUTION],
	},
	[CLASS_ID.RANGER]: {
		availableKeyAttributes: [ATTRIBUTE.DEXTERITY, ATTRIBUTE.STRENGTH],
		secondaryAttributes: [ATTRIBUTE.CONSTITUTION, ATTRIBUTE.WISDOM],
	},
	[CLASS_ID.ROGUE]: {
		availableKeyAttributes: ATTRIBUTES_ALL,
		secondaryAttributes: [ATTRIBUTE.CHARISMA, ATTRIBUTE.CONSTITUTION],
	},
	[CLASS_ID.WITCH]: {
		availableKeyAttributes: [ATTRIBUTE.INTELLIGENCE],
		secondaryAttributes: [ATTRIBUTE.DEXTERITY, ATTRIBUTE.WISDOM],
	},
	[CLASS_ID.WIZARD]: {
		availableKeyAttributes: [ATTRIBUTE.INTELLIGENCE],
		secondaryAttributes: [ATTRIBUTE.CONSTITUTION, ATTRIBUTE.DEXTERITY],
	},
};

export const DIFFICULTY_CLASS_BASE = 10;
