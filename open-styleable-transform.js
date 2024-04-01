import { parseHTML } from "linkedom";

export function transformHtml(html) {
	const { document } = parseHTML(html);

	const documentStyles = Array.from(
		document.querySelectorAll("link[rel=stylesheet], style")
	);

	let roots = [document.documentElement];

	while (roots.length) {
		let root = roots.pop();
		if (!root) break;

		const templates = Array.from(
			root.querySelectorAll("template[shadowrootmode]")
		);
		const parentStyles = Array.from(
			root.querySelectorAll("link[rel=stylesheet], style")
		);

		for (const template of templates.filter((template) =>
			template.hasAttribute("adoptpagestyles")
		)) {
			template.append(...documentStyles.map((el) => el.cloneNode(true)));
		}

		for (const template of templates.filter((template) =>
			template.hasAttribute("adopthoststyles")
		)) {
			template.append(...parentStyles.map((el) => el.cloneNode(true)));
		}

		roots.push(...templates);
	}

	return document.toString();
}
