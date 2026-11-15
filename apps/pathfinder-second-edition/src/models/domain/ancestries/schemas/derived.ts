import { array, minLength, object, optional, pipe } from "valibot";

import { AncestryAbilityIdSchema } from "../../abilities/schemas/base";
import { ActionIdSchema } from "../../actions/schemas/base";
import { AttributeBoostSchema, AttributeFlawSchema } from "../../attributes/schemas/base";
import { HitPointsSchema } from "../../characters/schemas/base";
import { AncestryFeatIdSchema } from "../../feats/schemas/base";
import { ItemIdSchema } from "../../items/schemas/base";
import { LanguageSchema } from "../../languages/schemas/base";
import { SizeSchema } from "../../sizes/schemas/base";
import { TraitIdSchema } from "../../traits/schemas/base";
import { HeritageIdSchema, SpeedSchema } from "./base";

const AncestryLanguagesSchema = object({
	additional: pipe(array(LanguageSchema), minLength(1)),
	default: pipe(array(LanguageSchema), minLength(1)),
});

export const AncestrySchema = object({
	abilities: optional(pipe(array(AncestryAbilityIdSchema), minLength(1))),
	attributeBoosts: pipe(array(AttributeBoostSchema), minLength(1)),
	attributeFlaw: optional(AttributeFlawSchema),
	feats: pipe(array(AncestryFeatIdSchema), minLength(1)),
	heritages: pipe(array(HeritageIdSchema), minLength(1)),
	hitPoints: HitPointsSchema,
	inventory: optional(pipe(array(ItemIdSchema), minLength(1))),
	languages: AncestryLanguagesSchema,
	size: SizeSchema,
	speed: SpeedSchema,
	traits: pipe(array(TraitIdSchema), minLength(1)),
});

export const HeritageSchema = object({
	abilities: optional(pipe(array(AncestryAbilityIdSchema), minLength(1))),
	actions: optional(pipe(array(ActionIdSchema), minLength(1))),
});
