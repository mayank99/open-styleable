# open-styleable

A proof-of-concept implementation of open-styleable shadow-roots, using a combination of:

- A build-time HTML transform for declarative shadow DOM
- A client-side script that overrides `attachShadow`

## Usage

To create an openly styleable shadow-root, add `adoptstyles="inherit"` to the declarative shadow DOM template.

```html
<template shadowrootmode="open" adoptstyles="inherit">…</template>
```

This shadow-root will now automatically inherit all styles from the host context (i.e. the document or a parent shadow-root).

Alternatively, if you only want to adopt styles from the document and not from the parent shadow-root, then you can use `adoptstyles="initial"`.

```html
<template shadowrootmode="open" adoptstyles="initial">…</template>
```

For client-rendered shadow-roots, use the `adoptStyles` option when calling `attachShadow`.

```js
this.attachShadow({
	mode: "open",
	adoptStyles: "inherit", // or "initial"
});
```

## Development

This demo is built with 11ty. All html routes go in the `pages/` directory, and all CSS (and other assets) live in the `public` directory.

You can play with it in your browser using StackBlitz or GitHub Codespaces:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github.com/mayank99/open-styleable?file=pages/index.html) [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/mayank99/open-styleable)

<details>
<summary>Local setup</summary>

To run it locally, clone the repo and follow these steps:

1. Install dependencies.

   ```
   npm install
   ```

2. Start the dev server.

   ```
   npm run dev
   ```

3. Open up `localhost:1174` in your browser.

</details>
