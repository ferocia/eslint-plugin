# `@ferocia/eslint-plugin`

> Shareable ESLint Rules

## Install

Pick the latest git commit hash and substitute it below.

To install via HTTPS:

```bash
yarn add --dev https://github.com/ferocia/eslint-plugin.git#GIT_COMMIT_HASH
```

Or SSH:

```bash
yarn add --dev ferocia/eslint-plugin.git#GIT_COMMIT_HASH
```

## Configure

In your ESLint config file...

```js
plugins: [
  // ...
  '@ferocia/eslint-plugin',
]

rules: {
  // ...

  // Enforce `Readonly<{...}>` over `{readonly ...}` when there are multiple props.
  '@ferocia/prefer-generic-readonly': 'error',

  // Enforce use of smart-quotes.
  '@ferocia/prefer-special-apostrophe': 'error',

  // Enforce `Nullable<X>` over `X | null | undefined`.
  // requires adding `declare type Nullable<T> = T | null | undefined`
  // to your `global.d.ts`.
  '@ferocia/prefer-nullable': 'error',
}
```

## Development

To work on this, check out the [ESLint Plugin docs](https://eslint.org/docs/developer-guide/working-with-plugins).

To run the tests in watch mode, run:

```bash
yarn dev
```

To format all code, run:

```bash
yarn format
```
