import { enum_ } from "valibot";

import { SAVING_THROW_TYPE } from "../constants";

export const SavingThrowTypeSchema = enum_(SAVING_THROW_TYPE);
