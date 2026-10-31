import { type ReactNode } from "react";
import { Link, type LoaderFunctionArgs, useLoaderData } from "react-router";

import { type Character, db } from "../../../services/db";
import { NameControl } from "./components/name-control";

const loader = async ({ params }: LoaderFunctionArgs): Promise<Character> => {
	const character = await db.characters.get(params.id ?? "");

	if (typeof character === "undefined") {
		throw new Error("Character not found");
	}

	return character;
};

const Component = (): ReactNode => {
	const character = useLoaderData<typeof loader>();

	return (
		<main>
			<p>
				<Link to="/">Characters</Link>
			</p>
			{/* Remount when :id changes so NameControl's useState(character.name) re-initializes. */}
			<NameControl key={character.id} character={character} />
		</main>
	);
};

export { Component, loader };
