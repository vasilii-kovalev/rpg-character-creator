import { type ComponentProps, type ReactNode } from "react";

import { button } from "./button.css";

const Button = (props: ComponentProps<"button">): ReactNode => {
	const { children, type = "button", ...rest } = props;

	return (
		// oxlint-disable-next-line react/button-has-type Default type is applied before the rest spread.
		<button type={type} {...rest} className={button}>
			{children}
		</button>
	);
};

export { Button };
