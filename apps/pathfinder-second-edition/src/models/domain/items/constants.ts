import { ARMOR_TYPE } from "../armor/constants";
import { WEAPON_TYPE } from "../weapons/constants";

export const ITEM_CATEGORY = {
	ARMOR: "ARMOR",
	POTION: "POTION",
	SCROLL: "SCROLL",
	SHIELD: "SHIELD",
	WEAPON: "WEAPON",
} as const;

export const ITEM_ID = {
	...ARMOR_TYPE,
	...WEAPON_TYPE,
} as const;
