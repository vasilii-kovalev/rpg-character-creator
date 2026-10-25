import { generateId } from "../generate-id.ts";

// Unreserved characters, so the id is one URL-safe route segment.
const urlSafeSegment = /^[A-Za-z0-9._~-]+$/u;

it("returns a URL-safe string", () => {
	const id = generateId();

	expect(id).toMatch(urlSafeSegment);
});

// Longer than three characters, which excludes the create route segment `new`.
it("returns a string longer than three characters", () => {
	const id = generateId();

	expect(id.length).toBeGreaterThan("new".length);
});

it("returns a different string on each call", () => {
	const first = generateId();
	const second = generateId();

	expect(first).not.toBe(second);
});
