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

	function construct(/** @type StyleSheetList */ styleSheets) {
		return Array.from(styleSheets).map((styleSheet) => {
			const _global =
				styleSheet.ownerNode?.ownerDocument.defaultView || globalThis;
			const sheet = new _global.CSSStyleSheet();
			sheet.replaceSync(stringifyStyleSheet(styleSheet));
			return sheet;
		});
	}

	function stringifyStyleSheet(/** @type CSSStyleSheet */ styleSheet) {
		return Array.from(styleSheet.cssRules)
			.map((rule) => rule.cssText || "")
			.join("\n");
	}
})();
