import { flavor, integer, minValue, number, pipe } from "valibot";

export const WeightSchema = pipe(number(), integer(), minValue(0), flavor("Weight"));
