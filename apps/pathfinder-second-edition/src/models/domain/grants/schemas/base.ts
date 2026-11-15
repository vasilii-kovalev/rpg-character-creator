import { enum_ } from "valibot";

import { GRANT_TYPE } from "../constants";

export const GrantTypeSchema = enum_(GRANT_TYPE);
