import { enum_, flavor, integer, minValue, number, pipe } from "valibot";

import { ANCESTRY_ID, HERITAGE_ID } from "../constants";

export const AncestryIdSchema = enum_(ANCESTRY_ID);

export const HeritageIdSchema = enum_(HERITAGE_ID);

export const SpeedSchema = pipe(number(), integer(), minValue(0), flavor("Speed"));
