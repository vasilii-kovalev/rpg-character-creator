import { nanoid } from "nanoid";

// URL-safe 21-character ids, distinct from the `new` create-route segment.
const createId = (): string => {
	return nanoid();
};

export { createId };
