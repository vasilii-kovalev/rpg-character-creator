import { enum_, flavor, integer, number, pipe } from "valibot";

import { ATTRIBUTE, ATTRIBUTE_BOOST, ATTRIBUTE_FLAW } from "../constants";

export const AttributeSchema = enum_(ATTRIBUTE);

export const AttributeModifierSchema = pipe(number(), integer(), flavor("AttributeModifier"));

export const AttributeBoostSchema = enum_(ATTRIBUTE_BOOST);

export const AttributeFlawSchema = enum_(ATTRIBUTE_FLAW);
