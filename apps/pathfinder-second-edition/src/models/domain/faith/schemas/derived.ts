import { array, literal, minLength, object, optional, pipe, variant } from "valibot";

import { AttributeSchema } from "../../attributes/schemas/base";
import { FeatIdSchema } from "../../feats/schemas/base";
import { SkillIdSchema } from "../../skills/schemas/base";
import { SpellIdSchema } from "../../spells/schemas/base";
import { SanctificationTraitIdSchema, TraitIdSchema } from "../../traits/schemas/base";
import { WeaponTypeSchema } from "../../weapons/schemas/base";
import { DeityDomainSchema } from "./base";

const SanctificationSchema = variant("isRequired", [
	object({
		availableTraits: pipe(array(SanctificationTraitIdSchema), minLength(1)),
		isRequired: literal(false),
	}),
	object({
		isRequired: literal(true),
		trait: TraitIdSchema,
	}),
]);

export const FaithDevoteeBenefitsSchema = object({
	availableDivineAttributes: pipe(array(AttributeSchema), minLength(1)),
	availableDivineFonts: pipe(array(FeatIdSchema), minLength(1)),
	availableDivineSkills: pipe(array(SkillIdSchema), minLength(1)),
	clericSpells: pipe(array(SpellIdSchema), minLength(1)),
	domains: pipe(array(DeityDomainSchema), minLength(1)),
	favoredWeapons: pipe(array(WeaponTypeSchema), minLength(1)),
	sanctification: optional(SanctificationSchema),
});
