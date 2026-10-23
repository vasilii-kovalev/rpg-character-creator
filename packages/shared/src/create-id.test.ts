import { createId } from "./create-id.ts";

const urlSafeId = /^[A-Za-z0-9_-]{21}$/u;

describe("createId", () => {
	it("returns distinct 21-character URL-safe strings", () => {
		const first = createId();
		const second = createId();

		expect(first).toMatch(urlSafeId);
		expect(second).toMatch(urlSafeId);
		expect(first).not.toBe(second);
	});
});
