import pluginWebc from "@11ty/eleventy-plugin-webc";

/** @param {import("@11ty/eleventy/src/UserConfig.js").default} eleventyConfig */
export default function (eleventyConfig) {
	eleventyConfig.ignores?.add("README.md");
	eleventyConfig.addPlugin(pluginWebc, {
		components: ["_components/**/*.webc"],
	});

	eleventyConfig.setServerOptions({
		domDiff: false,
	});

	return {
		htmlTemplateEngine: "webc",
		dir: {
			input: "pages",
			includes: "../_includes",
			output: "dist",
		},
	};
}
