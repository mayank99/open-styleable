import { transformHtml } from "./open-styleable.js";

/** @param {import("@11ty/eleventy/src/UserConfig.js").default} eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.ignores?.add("README.md");

	eleventyConfig.addPassthroughCopy({ public: "." });
	eleventyConfig.addPassthroughCopy("open-styleable-client.js");

	eleventyConfig.setServerOptions({ domDiff: false });

	eleventyConfig.addTransform("open-styleable", function (content) {
		if (this.page.outputPath?.endsWith(".html")) {
			return transformHtml(content);
		}
	});

	return {
		dir: {
			input: "pages",
			includes: "../_includes",
			output: "dist",
		},
	};
}
