export default function (eleventyConfig) {
	eleventyConfig.ignores.add('README.md');

	return {
		dir: {
			input: "pages",
			output: "dist"
		}
	}
}
