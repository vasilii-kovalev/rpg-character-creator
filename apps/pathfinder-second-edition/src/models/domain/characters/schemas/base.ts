import { flavor, integer, maxValue, minValue, number, pipe } from "valibot";

import { HERO_POINTS_MAX } from "../constants";

export const AgeSchema = pipe(number(), integer(), minValue(0), flavor("Age"));

export const HeroPointSchema = pipe(number(), integer(), minValue(0), maxValue(HERO_POINTS_MAX), flavor("HeroPoint"));

export const HitPointsSchema = pipe(number(), integer(), minValue(0), flavor("HitPoints"));

export const SpeedSchema = pipe(number(), integer(), minValue(0), flavor("Speed"));
