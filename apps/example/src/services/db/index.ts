import { Dexie, type EntityTable } from "dexie";

interface Character {
	id: string;
	name: string;
}

const charactersSchemaVersion = 1;

class CharacterDatabase extends Dexie {
	public characters!: EntityTable<Character, "id">;

	public constructor() {
		// Injected at build time so each application gets its own database on the shared origin.
		super(import.meta.env.VITE_APPLICATION_DATABASE_NAME);

		this.version(charactersSchemaVersion).stores({
			characters: "id, name",
		});
	}
}

const db = new CharacterDatabase();

export { type Character, db };
