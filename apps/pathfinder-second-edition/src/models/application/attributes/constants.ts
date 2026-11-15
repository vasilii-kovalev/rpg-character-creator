import { ATTRIBUTE } from "../../domain/attributes/constants";
import { type Attribute } from "../../domain/attributes/types";

export const ATTRIBUTE_NAMES_MAP: Record<Attribute, string> = {
	[ATTRIBUTE.CHARISMA]: "Charisma",
	[ATTRIBUTE.CONSTITUTION]: "Constitution",
	[ATTRIBUTE.DEXTERITY]: "Dexterity",
	[ATTRIBUTE.INTELLIGENCE]: "Intelligence",
	[ATTRIBUTE.STRENGTH]: "Strength",
	[ATTRIBUTE.WISDOM]: "Wisdom",
};
