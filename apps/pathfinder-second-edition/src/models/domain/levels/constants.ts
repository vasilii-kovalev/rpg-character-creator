export const LEVEL_MIN = 1;

export const LEVEL_MAX = 20;

export const LEVELS_ALL = Array.from(
	{
		length: LEVEL_MAX - LEVEL_MIN + 1,
	},
	(_item, index) => {
		return index + LEVEL_MIN;
	},
);

export const EXPERIENCE_PER_LEVEL = 1_000;

export const EXPERIENCE_MAX = (LEVEL_MAX - LEVEL_MIN) * EXPERIENCE_PER_LEVEL;
