import { flavor, integer, maxValue, minValue, number, pipe } from "valibot";

import { EXPERIENCE_MAX, LEVEL_MAX, LEVEL_MIN } from "../constants";

export const LevelSchema = pipe(number(), integer(), minValue(LEVEL_MIN), maxValue(LEVEL_MAX), flavor("Level"));

export const ExperienceSchema = pipe(number(), integer(), minValue(0), maxValue(EXPERIENCE_MAX), flavor("Experience"));
