(() => {
	const originalAttachShadow = Element.prototype.attachShadow;

	Element.prototype.attachShadow = function (
		/** @type {ShadowRootInit} */ init
	) {
		const shadow = originalAttachShadow.call(this, init);
		if (!init["adoptStyles"]) return shadow;

		let source;
		if (init["adoptStyles"] === "initial") {
			source = this.ownerDocument;
		} else if (init["adoptStyles"] === "inherit") {
			source = shadow.host.getRootNode();
		}

		shadow.adoptedStyleSheets.push(
			...construct(source.styleSheets),
			...source.adoptedStyleSheets
		);

		return shadow;
	};

	function construct(styleSheets) {
		return Array.from(styleSheets).map((styleSheet) => {
			const sheet = new CSSStyleSheet();
			sheet.replace(stringifyStyleSheet(styleSheet));
			return sheet;
		});
	}

	function stringifyStyleSheet(stylesheet) {
		return Array.from(stylesheet.cssRules)
			.map((rule) => rule.cssText || "")
			.join("\n");
	}
})();
