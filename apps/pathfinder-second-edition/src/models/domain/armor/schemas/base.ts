import { flavor, integer, minValue, number, pipe } from "valibot";

export const ArmorClassSchema = pipe(number(), integer(), minValue(0), flavor("ArmorClass"));
