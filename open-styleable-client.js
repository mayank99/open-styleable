(() => {
	const originalAttachShadow = Element.prototype.attachShadow;

	Element.prototype.attachShadow = function (
		/** @type {ShadowRootInit} */ init
	) {
		const shadow = originalAttachShadow.call(this, init);

		let sourceNode;
		if (init["adoptStyles"] === "initial") {
			sourceNode = this.ownerDocument;
		} else if (init["adoptStyles"] === "inherit") {
			sourceNode = shadow.host.getRootNode();
		}

		if (!sourceNode) return shadow;

		shadow.adoptedStyleSheets.push(
			...construct(sourceNode.styleSheets),
			...sourceNode.adoptedStyleSheets
		);

		return shadow;
	};

	function construct(styleSheets) {
		return Array.from(styleSheets).map((styleSheet) => {
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(stringifyStyleSheet(styleSheet));
			return sheet;
		});
	}

	function stringifyStyleSheet(stylesheet) {
		return Array.from(stylesheet.cssRules)
			.map((rule) => rule.cssText || "")
			.join("\n");
	}
})();
