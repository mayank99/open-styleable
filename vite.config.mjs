import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { transformHtml } from "./open-styleable.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const pages = fs.readdirSync("pages").filter((file) => file.endsWith(".html"));

export default defineConfig({
	appType: "mpa",
	plugins: [openStyleablePlugin()],
});

function openStyleablePlugin() {
	let isDev = false;

	return /** @type {import("vite").Plugin} */ ({
		name: "open-styleable",
		enforce: "pre",
		config(_, { mode }) {
			isDev = mode === "development";
		},
		transformIndexHtml(html) {
			if (!isDev) return;
			return transformHtml(html); // FIXME: this doesn't account for hashed stylesheet urls
		},
		transform(code, id) {
			if (!id.endsWith(".html")) return;

			return { code: transformHtml(code) };
		},
	});
}

function htmlPagesPlugin() {
	let isDev = false;

	return /** @type {import("vite").Plugin} */ ({
		name: "html-pages-directory",
		config(_, { mode }) {
			isDev = mode === "development";
		},
		configResolved(config) {
			config.build.rollupOptions.input = Object.fromEntries(
				pages.map((page) => [
					page.replace(".html", ""),
					path.resolve(dirname, `./pages/${page}`),
				])
			);
		},
		configureServer(server) {
			if (!isDev) return;

			server.middlewares.use((req, res, next) => {
				if (req.url === "/") {
					res.statusCode = 302;
					res.setHeader(
						"Location",
						`/${pages.find((page) => page === "index.html")}`
					);
					res.end();
					return;
				}

				const page = pages.find((page) => req.url === `/${page}`);
				if (page) {
					res.end(fs.readFileSync(`./pages/${page}`, "utf-8"));
					return;
				}

				next();
			});
		},
	});
}
