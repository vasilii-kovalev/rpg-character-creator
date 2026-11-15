import { type InferOutput } from "valibot";

import { type AncestryIdSchema, type HeritageIdSchema } from "./schemas/base";
import { type AncestrySchema, type HeritageSchema } from "./schemas/derived";

export type AncestryId = InferOutput<typeof AncestryIdSchema>;

export type Ancestry = InferOutput<typeof AncestrySchema>;

export type HeritageId = InferOutput<typeof HeritageIdSchema>;

export type Heritage = InferOutput<typeof HeritageSchema>;
