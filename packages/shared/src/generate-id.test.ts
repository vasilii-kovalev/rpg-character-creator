import { generateId } from "./generate-id.ts";

const urlSafeId = /^[A-Za-z0-9_-]{21}$/u;

describe("generateId", () => {
	it("returns distinct 21-character URL-safe strings", () => {
		const first = generateId();
		const second = generateId();

		expect(first).toMatch(urlSafeId);
		expect(second).toMatch(urlSafeId);
		expect(first).not.toBe(second);
	});
});
