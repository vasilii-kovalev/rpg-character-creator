import { type InferOutput } from "valibot";

import { type ArmorClassSchema } from "./schemas/base";

export type ArmorClass = InferOutput<typeof ArmorClassSchema>;
