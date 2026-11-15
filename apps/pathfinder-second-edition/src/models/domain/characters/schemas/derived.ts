import { array, entriesFromList, minLength, object, pipe } from "valibot";

import { BeliefIdSchema } from "../../faith/schemas/base";
import { AncestryFeatIdSchema } from "../../feats/schemas/base";
import { ProficiencyLevelSchema } from "../../proficiencies/schemas/base";
import { SKILL_IDS_ALL } from "../../skills/constants";
import { TraitIdSchema } from "../../traits/schemas/base";
import { AgeSchema, HeroPointSchema } from "./base";

const CharacterSkillsSchema = object(entriesFromList(SKILL_IDS_ALL, ProficiencyLevelSchema));

export const CharacterSchema = object({
	age: AgeSchema,
	ancestryFeats: pipe(array(AncestryFeatIdSchema), minLength(1)),
	belief: BeliefIdSchema,
	heroPoints: HeroPointSchema,
	skills: CharacterSkillsSchema,
	traits: pipe(array(TraitIdSchema), minLength(1)),
});
