import { render } from "vitest-browser-react";

import { Button } from "./button";

test("renders a button with the given label", async () => {
	const screen = await render(<Button>Save character</Button>);

	const button = screen.getByRole("button", {
		name: "Save character",
	});

	await expect.element(button).toBeInTheDocument();
});
