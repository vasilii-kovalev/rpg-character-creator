import { type Meta, type StoryObj } from "@storybook/react-vite";

import { Button } from "./button";

const meta = {
	component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		children: "Button",
	},
} satisfies Story;

export default meta;
