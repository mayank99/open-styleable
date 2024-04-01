(() => {
	const originalAttachShadow = Element.prototype.attachShadow;

	Element.prototype.attachShadow = function (
		/** @type {ShadowRootInit} */ init
	) {
		const shadow = originalAttachShadow.call(this, init);

		let sourceNode;
		if (init["adoptPageStyles"] === true) {
			sourceNode = this.ownerDocument;
		} else if (init["adoptHostStyles"] === true) {
			sourceNode = shadow.host.getRootNode();
		}

		if (!sourceNode) return shadow;

		shadow.adoptedStyleSheets.push(
			...construct(sourceNode.styleSheets),
			...sourceNode.adoptedStyleSheets
		);

		return shadow;
	};

	const cache = new WeakMap();

	function construct(/** @type StyleSheetList */ styleSheets) {
		const _this = this || globalThis;
		if (!cache.has(_this)) {
			cache.set(_this, new WeakMap());
		}

		return Array.from(styleSheets).map((styleSheet) => {
			if (cache.get(_this).has(styleSheet)) {
				return cache.get(_this).get(styleSheet);
			}

			const sheet = new _this.CSSStyleSheet();
			sheet.replaceSync(stringify(styleSheet));
			cache.get(_this).set(styleSheet, sheet);
			return sheet;
		});
	}

	function stringify(/** @type CSSStyleSheet */ styleSheet) {
		return Array.from(styleSheet.cssRules)
			.map((rule) => rule.cssText || "")
			.join("\n");
	}
})();
