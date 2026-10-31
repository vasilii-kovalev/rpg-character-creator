/* CSpell:words azoralaw communityuse orclicense paizo */
import { type ReactNode } from "react";
import { type ActionFunctionArgs, Form, Link, useLoaderData } from "react-router";

import { type Character, db } from "../../../services/db";

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

			<h2>Legal</h2>
			<h3>Application</h3>
			<p>
				See the <a href="https://github.com/vasilii-kovalev/rpg-character-creator/blob/main/LICENSE">LICENSE</a> file.
			</p>
			<h3>Pathfinder Second Edition character creator</h3>
			<p>
				The Pathfinder Second Edition character creator uses trademarks and/or copyrights owned by Paizo Inc., used
				under Paizo&apos;s Community Use Policy (
				<a href="https://paizo.com/licenses/communityuse">paizo.com/licenses/communityuse</a>
				). We are expressly prohibited from charging you to use or access this content. The Pathfinder Second Edition
				character creator is not published, endorsed, or specifically approved by Paizo. For more information about
				Paizo Inc. and Paizo products, visit <a href="https://paizo.com">paizo.com</a>.
			</p>
			<p>
				Contact: <a href="https://github.com/vasilii-kovalev">github.com/vasilii-kovalev</a>.
			</p>
			<h4>ORC License</h4>
			<p>
				This product is licensed under the ORC License located at the Library of Congress at TX 9-307-067 and available
				online at various locations including <a href="https://paizo.com/orclicense">paizo.com/orclicense</a>,{" "}
				<a href="https://azoralaw.com/orclicense">azoralaw.com/orclicense</a>, and others. All warranties are disclaimed
				as set forth therein.
			</p>
			<p>This product is based on the following Licensed Material:</p>
			{/* CSpell:disable */}
			<p>
				Pathfinder Player Core © 2023 Paizo Inc., Designed by Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland,
				and Mark Seifter. Authors: Alexander Augunas, Kate Baker, Logan Bonner, Jason Bulmahn, Carlos Cabrera, Calder
				CaDavid, James Case, Eleanor Ferron, Steven Hammond, Joan Hong, Vanessa Hoskins, James Jacobs, Jenny Jarzabski,
				Erik Keith, Dustin Knight, Lyz Liddell, Luis Loza, Patchen Mortimer, Dennis Muldoon, Stephen Radney-MacFarland,
				Mikhail Rekun, David N. Ross, Michael Sayre, Mark Seifter, Kendra Leigh Speedling, Mark Thompson, Clark
				Valentine, Andrew White, Landon Winkler, and Linda Zayas-Palmer
			</p>
			<p>
				Pathfinder Player Core 2 © 2024, Paizo Inc.; Authors: Amirali Attar Olyaee, Alexander Augunas, Brian Bauman,
				Joshua Birdsong, Logan Bonner, Jason Bulmahn, James Case, Jessica Catalan, John Compton, Paris Crenshaw, Jesse
				Decker, Eleanor Ferron, Fabby Garza Marroquín, Steven Hammond, Sasha Laranoa Harving, Joan Hong, Nicolas
				Hornyak, Vanessa Hoskins, James Jacobs, Jason Keeley, Dustin Knight, Avi Kool, Lyz Liddell, Nicolas Logue, Luis
				Loza, Ron Lundeen, Patchen Mortimer, Stephen Radney-MacFarland, Jessica Redekop, Mikhail Rekun, Alex Riggs,
				David N. Ross, Michael Sayre, Mark Seifter, Owen K.C. Stephens, Jason Tondro, Clark Valentine, Andrew White,
				Landon Winkler, and Tonya Woldridge.
			</p>
			{/* CSpell:enable */}
			<p>
				If you use our Licensed Material in your own work, please credit us in your product as follows: RPG character
				creator © 2026 Vasilii Kovalev.
			</p>
			<p>
				Reserved Material: the name &quot;RPG character creator&quot;, the source code, the tests, the interface, and
				the site design, except where they express game mechanics.
			</p>
			<p>Expressly Designated Licensed Material: none.</p>
		</main>
	);
};

export { action, Component, loader };
