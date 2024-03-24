import { parseHTML } from "linkedom";

export function transformHtml(html) {
	const { document } = parseHTML(html);

	let roots = [document.documentElement];

	while (roots.length) {
		let root = roots.pop();
		if (!root) break;

		const templates = Array.from(
			root.querySelectorAll("template[shadowrootmode]")
		);
		const allStyles = Array.from(
			root.querySelectorAll("link[rel=stylesheet], style")
		);

		for (const template of templates.filter(
			(template) => template.getAttribute("adoptstyles") === "inherit"
		)) {
			template.append(...allStyles.map((el) => el.cloneNode(true)));
		}

		roots.push(...templates);
	}

	return document.toString();
}
