import { enum_, flavor, integer, minValue, number, pipe } from "valibot";

import { CURRENCY } from "../constants";

export const CurrencySchema = enum_(CURRENCY);

export const CurrencyAmountSchema = pipe(number(), integer(), minValue(0), flavor("CurrencyAmount"));
