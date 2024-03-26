# open-styleable

A proof-of-concept implementation of open-styleable shadow-roots, using a combination of:

- A build-time HTML transform for declarative shadow DOM
- A client-side script that overrides `attachShadow`

Try it live:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github.com/mayank99/open-styleable?file=pages/index.html)

## Usage

*(See [standalone setup instructions](#standalone-setup) below if you're trying to use this in your own project)* 👀

The access for open styles is controlled at the shadow-root level. Every shadow-root needs to explicitly opt-in using one of the following ways.

For [declarative shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#declaratively_with_html) (DSD):

- Add `adoptstyles="inherit"` to the DSD template. This shadow-root will now automatically inherit all styles from the host context (i.e. the document or a parent shadow-root).

  ```html
  <template shadowrootmode="open" adoptstyles="inherit">…</template>
  ```

- Alternatively, if you only want to adopt styles from the document and not from the parent shadow-root, then you can use `adoptstyles="initial"`.

  ```html
  <template shadowrootmode="open" adoptstyles="initial">…</template>
  ```

For client-rendered shadow-roots, use the `adoptStyles` option when calling `attachShadow`.

- Use `adoptStyles: "inherit"` to adopt all styles from the host context.
  ```js
  this.attachShadow({
  	mode: "open",
  	adoptStyles: "inherit",
  });
  ```
- Use `adoptStyles: "initial"` to adopt all styles from the document only.
  ```js
  this.attachShadow({
  	mode: "open",
  	adoptStyles: "initial",
  });
  ```

## Standalone setup

To use this "polyfill" in your own project:

1. Install `open-styleable` from npm (or use [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)).
   ```
   npm add open-styleable
   ```
2. Hook up the HTML transform into your templating system (see [`.eleventy.js`](https://github.com/mayank99/open-styleable/blob/1587fe679b8e6682cdc15ac5e6a5dddaba963410/.eleventy.js#L12-L16) for an example). This should ideally be executed _after_ all bundling steps.
   ```js
   import { transformHtml } from "open-styleable";
   ```
   ```js
   // assuming `htmlContent` is the original page content
   htmlContent = transformHtml(htmlContent);
   ```
3. Include the `/client` script in your `<head>` before any custom elements are registered.
   ```html
   <script>
   	import "open-styleable/client";
   </script>
   ```
   or from a CDN:
   ```html
   <script src="https://esm.sh/open-styleable/client"></script>
   ```

> [!NOTE]
> You do _not_ always need to use both the build-time transform and the client-side script. They are completely independent and do different things.

---

## Development

This demo is built with 11ty. All html routes go in the `pages/` directory, and all CSS (and other assets) live in the `public` directory.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/mayank99/open-styleable)

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
