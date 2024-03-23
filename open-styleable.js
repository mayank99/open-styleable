import { parseHTML } from "linkedom";

export function transformHtml(html) {
	const { document } = parseHTML(html);

	let roots = [document.documentElement];

	while (roots.length) {
		let root = roots.pop();
		if (!root) break;

		const templates = Array.from(
			root.querySelectorAll("template[adoptstyles=inherit]")
		);
		const allStyles = Array.from(
			document.querySelectorAll("link[rel=stylesheet], style")
		);

		for (const template of templates) {
			template.setAttribute("data-done", "true");
			template.append(...allStyles.map((el) => el.cloneNode(true)));
		}

		roots.push(...templates);
	}

	return document.toString();
}
