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

## Publishing

1. Bump the `version` in `package.json` and commit to `main`.
1. Create a [new release](https://github.com/ferocia/eslint-plugin/releases/new), creating a new tag with the same value as the `package.json`. Publish.
1. An [action](https://github.com/ferocia/eslint-plugin/actions/workflows/publish.yml) will be triggered to automatically publish the package.
