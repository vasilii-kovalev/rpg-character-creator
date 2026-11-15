import { enum_ } from "valibot";

import { WEAPON_TYPE } from "../constants";

export const WeaponTypeSchema = enum_(WEAPON_TYPE);
