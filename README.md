# `@ferocia/eslint-plugin`

> Shareable ESLint Rules

## Install

```bash
yarn add --dev @ferocia-oss/eslint-plugin
```

## Configure

In your ESLint config file...

```js
plugins: [
  // ...
  '@ferocia-oss',
]

rules: {
  // ...

  // Enforce `Readonly<{...}>` over `{readonly ...}` when there are multiple props.
  '@ferocia-oss/prefer-generic-readonly': 'error',

  // Enforce use of smart-quotes.
  '@ferocia-oss/prefer-special-apostrophe': 'error',

  // Enforce `Nullable<X>` over `X | null | undefined`.
  // requires adding `declare type Nullable<T> = T | null | undefined`
  // to your `global.d.ts`.
  '@ferocia-oss/prefer-nullable': 'error',
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
