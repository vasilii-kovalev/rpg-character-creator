export const ATTRIBUTE = {
	CHARISMA: "CHARISMA",
	// Affects Hit Points and Fortitude saving throws.
	CONSTITUTION: "CONSTITUTION",
	// Affects Armor Class and Reflex saving throws.
	DEXTERITY: "DEXTERITY",
	// Affects skill points and languages count.
	INTELLIGENCE: "INTELLIGENCE",
	// Affects carrying capacity and melee damage rolls.
	STRENGTH: "STRENGTH",
	// Affects Perception and Will saving throws.
	WISDOM: "WISDOM",
} as const;

export const ATTRIBUTES_ALL = Object.values(ATTRIBUTE);

export const ATTRIBUTE_BOOST = {
	...ATTRIBUTE,
	FREE: "FREE",
} as const;

export const ATTRIBUTE_FLAW = ATTRIBUTE;

export const ATTRIBUTE_BOOST_MODIFIER = 1;

export const ATTRIBUTE_FLAW_MODIFIER = -1;
