# open-styleable

A proof-of-concept implementation of open-styleable shadow-roots, using a simple build-time HTML transform.

To create an openly styleable shadow-root, add `adoptstyles="inherit"` to the declarative shadow DOM template.

```html
<template shadowrootmode="open" adoptstyles="inherit">…</template>
```

This shadow-root will now automatically inherit all styles from the host context (i.e. the document or a parent shadow-root).

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github.com/mayank99/open-styleable?file=pages/index.html)

## Local setup

This demo is built with 11ty. All html routes go in the `pages/` directory, and all CSS (and other assets) live in the `public` directory.

To run it locally, clone the repo and install dependencies:

```
npm install
```

Then start the dev server:

```
npm run dev
```

Now open up `localhost:1174`
