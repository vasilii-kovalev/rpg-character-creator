import { type ReactNode, useState } from "react";

import { type Character, db } from "../../../../services/db";

interface NameControlProps {
	character: Character;
}

const NameControl = ({ character }: NameControlProps): ReactNode => {
	const [name, setName] = useState(character.name);

	return (
		<label>
			Name
			<input
				value={name}
				onChange={(event) => {
					const nextName = event.currentTarget.value;

					setName(nextName);

					void db.characters.update(character.id, {
						name: nextName,
					});
				}}
			/>
		</label>
	);
};

export { NameControl };
