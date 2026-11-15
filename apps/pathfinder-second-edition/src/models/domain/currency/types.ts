import { type InferOutput } from "valibot";

import { type CurrencyAmountSchema, type CurrencySchema } from "./schemas/base";

export type Currency = InferOutput<typeof CurrencySchema>;

export type CurrencyAmount = InferOutput<typeof CurrencyAmountSchema>;
