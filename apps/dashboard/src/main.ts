import "./styles.css";

interface Application {
	description: string;
	port: number;
	slug: string;
	title: string;
}

// Hand-written: the dashboard does not scan `apps/`.
const applications: Array<Application> = [
	{
		description: "Reference application used to prove the workspace.",
		port: 5174,
		slug: "example",
		title: "Example",
	},
];

const list = document.getElementById("applications");

if (list === null) {
	throw new Error("Application list is missing");
}

for (const application of applications) {
	const item = document.createElement("li");
	const link = document.createElement("a");
	const description = document.createElement("p");

	link.textContent = application.title;

	// Production is a relative sibling under `site/`. Dev servers run on their own ports.
	let href = `${application.slug}/`;

	if (import.meta.env.DEV) {
		href = `http://localhost:${application.port}/`;
	}

	link.href = href;
	description.textContent = application.description;
	item.append(link, description);
	list.append(item);
}
