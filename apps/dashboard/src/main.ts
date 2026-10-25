import "./styles.css";

interface Application {
	port: number;
	slug: string;
	title: string;
}

// Hand-written: the dashboard does not scan `apps/`.
const applications: Array<Application> = [
	{
		port: 5174,
		slug: "pathfinder-second-edition",
		title: "Pathfinder Second Edition",
	},
];

const list = document.getElementById("applications");

if (list === null) {
	throw new Error("Application list is missing");
}

for (const application of applications) {
	const item = document.createElement("li");
	const link = document.createElement("a");

	link.textContent = application.title;

	// Production is a relative sibling under `site/`. Dev servers run on their own ports.
	let href = `${application.slug}/`;

	if (import.meta.env.DEV) {
		href = `http://localhost:${application.port}/`;
	}

	link.href = href;
	item.append(link);
	list.append(item);
}
