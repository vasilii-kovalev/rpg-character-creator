import { enum_, flavor, integer, minValue, number, pipe } from "valibot";

import { CLASS_ID } from "../constants";

export const ClassIdSchema = enum_(CLASS_ID);

export const DifficultyClassSchema = pipe(number(), integer(), minValue(1), flavor("DifficultyClass"));
