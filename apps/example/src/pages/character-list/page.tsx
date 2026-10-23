import { type ReactNode } from "react";
import { type ActionFunctionArgs, Form, Link, useLoaderData } from "react-router";

import { type Character, db } from "../../services/db";

const loader = async (): Promise<Array<Character>> => {
	const characters = await db.characters.toArray();

	return characters;
};

const action = async ({ request }: ActionFunctionArgs): Promise<void> => {
	const formData = await request.formData();
	const id = formData.get("id");

	if (typeof id !== "string" || id === "") {
		throw new Error("Character id is missing");
	}

	await db.characters.delete(id);
};

const Component = (): ReactNode => {
	const characters = useLoaderData<typeof loader>();

	return (
		<main>
			<h1>Characters</h1>
			<ul>
				{characters.map((character) => {
					return (
						<li key={character.id}>
							<Link to={`/characters/${character.id}`}>{character.name}</Link>
							<Form method="post">
								<input type="hidden" name="id" value={character.id} />
								<button type="submit">Remove</button>
							</Form>
						</li>
					);
				})}
			</ul>
			<Link to="/characters/new">New character</Link>
		</main>
	);
};

export { action, Component, loader };
